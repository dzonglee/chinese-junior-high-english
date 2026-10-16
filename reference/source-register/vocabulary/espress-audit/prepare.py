import pathlib,fitz,json,hashlib,re
from PIL import Image,ImageDraw
r=pathlib.Path('/tmp/english-vocabulary-espress-audit');orig=pathlib.Path('/workspace/english-research-cache/editions-b/originals');src=json.load(open('/tmp/english-hebei-source-register.json'))
ranges={'grade6-upper':(123,129,130,138,[139]),'grade6-lower':(118,123,124,130,[131,132]),'grade7-upper':(119,124,125,130,[131,132]),'grade7-lower':(116,120,121,125,[126]),'grade8-upper':(114,118,119,123,[]),'grade8-lower':(118,122,123,127,[]),'grade9-upper':(115,119,120,124,[]),'grade9-lower':(109,112,113,116,[])}
for slug,(start,end,a,z,supp)in ranges.items():
 parent=orig/f'espress-five-four-{slug}-community-mirror.pdf';d=fitz.open(parent);f=r/slug;f.mkdir(exist_ok=True);grade=int(re.search(r'grade(\d)',slug)[1]);term='upper'if'upper'in slug else'lower';s=next(x for x in src if'教科版-'in x['title']and f'grade{grade} {term}'in x['title']);identity=sorted(set([1,2,3,len(d)]));ps=sorted(set(identity+list(range(start,z+1))+supp));m={'book_slug':slug,'grade':grade,'term':term,'parent_local_path':str(parent),'parent_sha256':hashlib.sha256(parent.read_bytes()).hexdigest(),'parent_bytes':parent.stat().st_size,'parent_page_count':len(d),'upstream_source_id':s['source_id'],'upstream_commit':'bf15137b2f36f45e08e7ac4a77956fc2ccd1c215','public_git_repository':'https://github.com/TapXWorld/ChinaTextbook','public_git_commit':'5a80345f2043ba6f8db8d7be9cf3db82725ff1f7','source_url':s['url'],'main_pages':list(range(start,end+1)),'alphabetical_pages':list(range(a,z+1)),'supplement_pages':supp,'identity_pages':identity,'retained_parent_pdf_pages':ps,'commercial_reuse_approved':False};(f/'parent-provenance.json').write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n')
 for n in ps:
  p=d[n-1];p.get_pixmap(matrix=fitz.Matrix(1.3,1.3)).save(f/f'p{n:03}.png');(f/f'p{n:03}.txt').write_text(p.get_text());(f/f'p{n:03}-raw.json').write_text(json.dumps(p.get_text('rawdict'),ensure_ascii=False,default=lambda x:'[binary excluded]'))
 for k in range(0,len(ps),4):
  ims=[Image.open(f/f'p{n:03}.png').convert('RGB')for n in ps[k:k+4]];w=max(im.width for im in ims);h=max(im.height for im in ims)+22;c=Image.new('RGB',(w*2,h*2),'#ddd');dr=ImageDraw.Draw(c)
  for j,im in enumerate(ims):c.paste(im,(j%2*w,j//2*h+22));dr.text((j%2*w+5,j//2*h+3),f'{slug} PDF{ps[k+j]}',fill='black')
  c.save(f/f'sheet-{k//4+1:02}.jpg',quality=95)
 print(slug,len(ps),flush=True)
