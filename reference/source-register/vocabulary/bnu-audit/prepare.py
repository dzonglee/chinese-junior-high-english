import pathlib,json,fitz,hashlib
from PIL import Image,ImageDraw
r=pathlib.Path('/tmp/english-vocabulary-bnu-audit')
c={'grade7-upper':([*range(113,122)],[*range(122,131)],[*range(103,113),131]),'grade7-lower':([*range(121,130)],[*range(130,138)],[*range(115,121),138,139]),'grade8-upper':([*range(135,143)],[*range(143,150)],[150,151]),'grade8-lower':([*range(135,143)],[*range(143,150)],[150,151]),'grade9-whole_year':([*range(192,201)],[*range(201,210)],[210,211])}
for source in json.load(open(r/'parents.json')):
 slug=pathlib.Path(source['local_cache_path']).name.replace('bnu-','').replace('-community-mirror.pdf','');f=r/slug;d=fitz.open(source['local_cache_path']);main,alpha,supp=c[slug];ids=[1,2,3,len(d)];pages=sorted(set(ids+main+alpha+supp));p={'book_slug':slug,'grade':int(slug[5]),'term':slug.split('-',1)[1][1:]if False else slug.split('-',1)[1],'parent_local_path':source['local_cache_path'],'parent_sha256':source['sha256'],'parent_bytes':source['bytes'],'parent_page_count':len(d),'upstream_source_id':source['source_id'],'upstream_commit':'bf15137b2f36f45e08e7ac4a77956fc2ccd1c215','public_git_repository':'https://github.com/TapXWorld/ChinaTextbook','public_git_commit':source['git_commit'],'source_url':'https://github.com/TapXWorld/ChinaTextbook/tree/'+source['git_commit']+'/'+source['mirror_path']+'.pdf_merge_folder','parent_acquisition':'Concatenated public git mirror pieces in upstream order; every git blob verified in R-ED-B; exact piece metadata retained below.','pieces':source['pieces'],'main_pages':main,'alphabetical_pages':alpha,'supplement_pages':supp,'identity_pages':ids,'retained_parent_pdf_pages':pages,'commercial_reuse_approved':False};(f/'parent-provenance.json').write_text(json.dumps(p,ensure_ascii=False,indent=2)+'\n')
 for n in pages:
  out=f/f'p{n:03}.png'
  if not out.exists():d[n-1].get_pixmap(matrix=fitz.Matrix(1.6,1.6),alpha=False).save(out)
 for offset in range(0,len(pages),4):
  chunk=pages[offset:offset+4];sheet=Image.new('RGB',(1500,2100),'#ccc');dr=ImageDraw.Draw(sheet)
  for i,n in enumerate(chunk):
   im=Image.open(f/f'p{n:03}.png');im.thumbnail((745,1020));x=(i%2)*750;y=(i//2)*1050;sheet.paste(im,(x,y+20));dr.text((x,y),f'{slug} PDF{n}',fill='black')
  sheet.save(f/f'sheet-{offset//4+1:02}.jpg')
 print(slug,len(pages),'retained pages',flush=True)
