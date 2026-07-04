import bpy, os, math
SCRATCH = "/private/tmp/claude-501/-Users-clementbalcon/0352088c-865e-4717-9cbb-2b64519e7d44/scratchpad"
OUT = os.path.join(SCRATCH, "frames")
os.makedirs(OUT, exist_ok=True)

scene = bpy.context.scene
cam = bpy.data.objects['Camera']
pivot = bpy.data.objects['HeroPivot']

cam.animation_data_clear()
pivot.animation_data_clear()
pivot.rotation_euler = (0, 0, 0)
cam.parent = None  # world-space keys, TRACK_TO keeps aim on pivot

bpy.context.preferences.edit.keyframe_new_interpolation_type = 'LINEAR'
scene.frame_start, scene.frame_end = 1, 120

# nose points -X ; sweep front 3/4 -> side profile -> raised rear 3/4
for f, loc in ((1, (-19, -12, 2.2)), (60, (-2, -19, 5.0)), (120, (13, -11, 7.5))):
    cam.location = loc
    cam.keyframe_insert('location', frame=f)

# soften the teal rim a touch
bpy.data.lights['Rim'].energy = 1400

scene.render.resolution_x, scene.render.resolution_y = 1920, 1080
scene.render.film_transparent = True
if hasattr(scene.eevee, 'taa_render_samples'):
    scene.eevee.taa_render_samples = 64
scene.render.image_settings.file_format = 'WEBP'
scene.render.image_settings.color_mode = 'RGBA'
scene.render.image_settings.quality = 85
scene.render.filepath = os.path.join(OUT, "frame_")

bpy.ops.wm.save_as_mainfile(filepath=os.path.join(SCRATCH, 'rafale_hero.blend'))
bpy.ops.render.render(animation=True)
print("DONE RENDER")
