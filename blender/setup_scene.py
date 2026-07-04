import bpy, os, re, math, mathutils

SCRATCH = "/private/tmp/claude-501/-Users-clementbalcon/0352088c-865e-4717-9cbb-2b64519e7d44/scratchpad"
TEXDIR = os.path.join(SCRATCH, "rafale-model", "textures")

def sanitize(name):
    return re.sub(r'[^a-z0-9]', '', os.path.splitext(name)[0].lower())

texfiles = {sanitize(f): os.path.join(TEXDIR, f) for f in os.listdir(TEXDIR)}
for img in bpy.data.images:
    if img.name == 'Render Result':
        continue
    key = sanitize(bpy.path.basename(img.filepath) or img.name)
    if key in texfiles:
        img.filepath = texfiles[key]
        img.reload()
        print(f"REPATHED {img.name}")
    else:
        print(f"NOMATCH  {img.name}")

# remove tex nodes only when the file genuinely doesn't exist on disk
for mat in bpy.data.materials:
    if not mat.use_nodes:
        continue
    for node in list(mat.node_tree.nodes):
        if node.type != 'TEX_IMAGE':
            continue
        img = node.image
        ok = img is not None and img.filepath and os.path.exists(bpy.path.abspath(img.filepath))
        if not ok:
            for out in node.outputs:
                for link in list(out.links):
                    to_sock = link.to_socket
                    mat.node_tree.links.remove(link)
                    if to_sock.type == 'RGBA' or 'Color' in to_sock.name:
                        to_sock.default_value = (0.02, 0.02, 0.025, 1)
            mat.node_tree.nodes.remove(node)
            print(f"REMOVED missing tex in {mat.name} (img={img.name if img else None})")

world = bpy.data.worlds.get('World') or bpy.data.worlds.new('World')
bpy.context.scene.world = world
world.use_nodes = True
bg = world.node_tree.nodes.get('Background')
if bg:
    bg.inputs[0].default_value = (0.002, 0.004, 0.008, 1)
    bg.inputs[1].default_value = 0.3

for o in [o for o in bpy.data.objects if o.type == 'LIGHT']:
    bpy.data.objects.remove(o, do_unlink=True)

def add_area(name, loc, rot_deg, size, energy, color=(1,1,1)):
    ld = bpy.data.lights.new(name, 'AREA')
    ld.energy = energy; ld.size = size; ld.color = color
    lo = bpy.data.objects.new(name, ld)
    lo.location = loc
    lo.rotation_euler = [math.radians(a) for a in rot_deg]
    bpy.context.collection.objects.link(lo)

add_area('Key',  (8, -10, 12),  (35, 0, 40),  10, 3000)
add_area('Rim',  (-10, 8, 6),   (60, 0, -130), 8, 2000, (0.22, 0.74, 0.97))
add_area('Fill', (0, -14, 2),   (80, 0, 0),    14, 600,  (0.6, 0.75, 0.9))

# linear keys by default (scrub-friendly, version-proof)
bpy.context.preferences.edit.keyframe_new_interpolation_type = 'LINEAR'

pivot = bpy.data.objects.new('HeroPivot', None)
pivot.location = mathutils.Vector((0, 0, 1.3))
bpy.context.collection.objects.link(pivot)

cam = bpy.data.objects['Camera']
cam.parent = pivot
cam.constraints.clear()
tr = cam.constraints.new('TRACK_TO')
tr.target = pivot
cam.data.lens = 50

scene = bpy.context.scene
scene.frame_start, scene.frame_end = 1, 120

cam.location = (16, -14, 3)
cam.keyframe_insert('location', frame=1)
pivot.rotation_euler = (0, 0, 0)
pivot.keyframe_insert('rotation_euler', frame=1)

cam.location = (11, -9, 6.5)
cam.keyframe_insert('location', frame=120)
pivot.rotation_euler = (0, 0, math.radians(110))
pivot.keyframe_insert('rotation_euler', frame=120)

engines = [e.identifier for e in bpy.types.RenderSettings.bl_rna.properties['engine'].enum_items]
scene.render.engine = 'BLENDER_EEVEE_NEXT' if 'BLENDER_EEVEE_NEXT' in engines else 'BLENDER_EEVEE'
scene.render.resolution_x = 1920
scene.render.resolution_y = 1080
scene.render.film_transparent = True
if hasattr(scene.eevee, 'taa_render_samples'):
    scene.eevee.taa_render_samples = 64

bpy.ops.wm.save_as_mainfile(filepath=os.path.join(SCRATCH, 'rafale_hero.blend'))
print("SAVED rafale_hero.blend")

scene.render.image_settings.file_format = 'PNG'
scene.render.image_settings.color_mode = 'RGBA'
for f in (1, 60, 120):
    scene.frame_set(f)
    scene.render.filepath = os.path.join(SCRATCH, f'test_frame_{f:03}.png')
    bpy.ops.render.render(write_still=True)
    print(f"RENDERED test frame {f}")
