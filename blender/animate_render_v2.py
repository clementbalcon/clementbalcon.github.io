import bpy, os, math

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(REPO, "frames", "hero")
os.makedirs(OUT, exist_ok=True)

scene = bpy.context.scene
cam = bpy.data.objects['Camera']
pivot = bpy.data.objects['HeroPivot']
mesh = bpy.data.objects['Dassault Rafale']

cam.animation_data_clear()
pivot.animation_data_clear()
mesh.animation_data_clear()
pivot.rotation_euler = (0, 0, 0)
cam.parent = None
cam.data.lens = 50

bpy.context.preferences.edit.keyframe_new_interpolation_type = 'LINEAR'
scene.frame_start, scene.frame_end = 1, 150

# face lointaine -> face proche -> 3/4 avant (v1) -> profil (v1) -> vue plongeante petite
cam_keys = (
    (1,   (-34, 0, 2.0)),
    (45,  (-14, 0, 2.3)),
    (75,  (-19, -12, 2.2)),
    (105, (-2, -19, 5.0)),
    (150, (9, -6, 90)),
)
for f, loc in cam_keys:
    cam.location = loc
    cam.keyframe_insert('location', frame=f)

# redressement du roulis (contrainte TRACK_TO en vue quasi verticale) : horizontal nez-a-gauche a f150
mesh.rotation_euler = (0, 0, 0)
mesh.keyframe_insert('rotation_euler', frame=105)
mesh.rotation_euler = (0, 0, math.radians(57.42))
mesh.keyframe_insert('rotation_euler', frame=150)

scene.render.resolution_x, scene.render.resolution_y = 1920, 1080
scene.render.film_transparent = True
if hasattr(scene.eevee, 'taa_render_samples'):
    scene.eevee.taa_render_samples = 64
scene.render.image_settings.file_format = 'WEBP'
scene.render.image_settings.color_mode = 'RGBA'
scene.render.image_settings.quality = 85
scene.render.filepath = os.path.join(OUT, "frame_")

bpy.ops.render.render(animation=True)
print("DONE RENDER V2")
