import bpy, os
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
scene = bpy.context.scene
cam = bpy.data.objects['Camera']
mesh = bpy.data.objects['Dassault Rafale']
pivot = bpy.data.objects['HeroPivot']

cam.animation_data_clear(); mesh.animation_data_clear(); pivot.animation_data_clear()
cam.parent = None
cam.constraints.clear()
cam.rotation_euler = (0, 0, 0)
mesh.rotation_euler = (0, 0, 0)
pivot.rotation_euler = (0, 0, 0)
cam.location = (0, 0, 21.5)
cam.data.lens = 50

scene.render.resolution_x, scene.render.resolution_y = 1200, 960
scene.render.film_transparent = True
if hasattr(scene.eevee, 'taa_render_samples'):
    scene.eevee.taa_render_samples = 64
scene.render.image_settings.file_format = 'WEBP'
scene.render.image_settings.color_mode = 'RGBA'
scene.render.image_settings.quality = 90
scene.render.filepath = os.path.join(REPO, 'rafale_top.webp')
bpy.ops.render.render(write_still=True)
print("RENDERED rafale_top.webp")
