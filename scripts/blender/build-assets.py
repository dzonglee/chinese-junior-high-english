"""Original English-learning artwork. Built entirely from Blender primitives and text."""
import bpy, math, os
from mathutils import Vector
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
OUT = os.path.join(ROOT, 'miniprogram/assets')
os.makedirs(OUT, exist_ok=True)
PALETTE = {'paper':'F3F7FF','indigo':'7282FF','teal':'57C6B4','coral':'F28C80','ink':'263A82','white':'FFFFFF'}
def material(name):
    mat=bpy.data.materials.new(name); mat.diffuse_color=tuple(int(PALETTE[name][i:i+2],16)/255 for i in (0,2,4))+(1,); mat.use_nodes=True
    shader=mat.node_tree.nodes.get('Principled BSDF'); shader.inputs['Base Color'].default_value=mat.diffuse_color; shader.inputs['Roughness'].default_value=.38
    return mat
M={k:material(k) for k in PALETTE}
def box(name, location, scale, mat, bevel=.09, rotation=0):
    bpy.ops.mesh.primitive_cube_add(size=1,location=location); o=bpy.context.object;o.name=name;o.dimensions=scale;o.rotation_euler[2]=rotation;bpy.ops.object.transform_apply(location=False, rotation=False, scale=True);o.data.materials.append(M[mat]);mod=o.modifiers.new('Soft edges','BEVEL');mod.width=bevel;mod.segments=5;o.modifiers.new('Weighted normals','WEIGHTED_NORMAL');return o
def letter(text,loc,size,mat,rotate=0):
    c=bpy.data.curves.new('Letter '+text,'FONT');c.body=text;c.align_x='CENTER';c.align_y='CENTER';c.size=size;c.extrude=.015;c.bevel_depth=.007
    o=bpy.data.objects.new('Letter '+text,c);bpy.context.collection.objects.link(o);o.location=loc;o.rotation_euler[2]=rotate;o.data.materials.append(M[mat]);return o
def reset():
    for o in list(bpy.data.objects): bpy.data.objects.remove(o,do_unlink=True)
def setup():
    scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=96;scene.cycles.use_denoising=False;scene.render.resolution_x=512;scene.render.resolution_y=512;scene.render.resolution_percentage=100;scene.render.film_transparent=True
    scene.world.color=(.5,.5,.5);scene.view_settings.view_transform='Standard';scene.view_settings.look='Medium High Contrast';scene.view_settings.exposure=0;scene.view_settings.gamma=1
    bpy.ops.object.camera_add(location=(4,-6,7));cam=bpy.context.object;cam.rotation_euler=(Vector((0,0,.3))-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.type='ORTHO';cam.data.ortho_scale=4.4;scene.camera=cam
    for loc,power,size in [((-3,-4,7),550,5),((4,2,5),380,4)]:
        bpy.ops.object.light_add(type='AREA',location=loc);light=bpy.context.object;light.data.energy=power;light.data.shape='DISK';light.data.size=size;light.rotation_euler=(-light.location).to_track_quat('-Z','Y').to_euler()
def render(name):
    setup();bpy.context.scene.render.filepath=os.path.join(OUT,name+'.png');bpy.ops.render.render(write_still=True)
reset()
# Open book: two page blocks, indigo covers, a teal bookmark and raised letters.
for x,ang in [(-.72,-.10),(.72,.10)]:
    box('Book cover',(x,0,.08),(1.52,2.2,.15),'indigo',.10,ang)
    box('Page block',(x,-.02,.20),(1.36,2.04,.18),'paper',.045,ang)
box('Spine',(0,0,.15),(.18,2.14,.25),'ink',.05)
letter('A',(-.72,-.12,.31),.92,'ink',-.10);letter('a',(.72,-.12,.31),.92,'teal',.10)
box('Bookmark',(.92,.73,.34),(.22,.80,.045),'coral',.03,.10)
render('welcome')
reset()
for n,(x,y,z,ang,col,char) in enumerate([(-.72,.2,.12,-.23,'indigo','A'),(.64,.35,.34,.20,'teal','B'),(0,-.7,.56,-.08,'paper','C')]):
    box('Vocabulary card '+str(n),(x,y,z),(1.65,1.9,.13),col,.15,ang);letter(char,(x,y,z+.09),1.0,'ink' if col=='paper' else 'white',ang)
render('cards')
reset()
box('Notebook cover',(0,0,.1),(2.6,2.9,.22),'teal',.18,-.12);box('Notebook pages',(.08,.02,.25),(2.35,2.66,.13),'paper',.09,-.12)
for i in range(4):box('Sentence rule '+str(i),(.14,.67-i*.42,.335),(1.5 if i<3 else .92,.07,.025),'indigo',.025,-.12)
box('Pencil',(.98,-.48,.52),(.17,2.55,.17),'coral',.04,-.55)
for y in [-.95,-.48,0,.48,.95]:box('Binding',(-1.16,y,.35),(.34,.14,.16),'ink',.06,-.12)
render('notebook')
