import pathlib,fitz,json,re,unicodedata,collections
r=pathlib.Path('/tmp/english-vocabulary-espress-audit');orig=pathlib.Path('/workspace/english-research-cache/editions-b/originals')
config={'grade6-lower':(118,123,102,313),'grade7-upper':(119,124,63,275),'grade7-lower':(116,120,65,276),'grade8-upper':(114,118,65,276),'grade8-lower':(118,122,66,277),'grade9-upper':(115,119,65,277),'grade9-lower':(109,112,58,269)}
def norm(t):return unicodedata.normalize('NFKC',t).replace('蒺','’').replace('鄄','-').replace('援','.').replace('\ue10b','’')
def spaced(cs):
 out='';prev=None
 for c in cs:
  ch=norm(c['c']);gap=c['bbox'][0]-prev['bbox'][2]if prev else 0
  if prev and gap>2.0 and out and out[-1]not in ' (/-(’'and ch[:1].isalnum():out+=' '
  out+=ch;prev=c
 return out
for slug,(start,end,left,right)in config.items():
 f=r/slug;f.mkdir(exist_ok=True);d=fitz.open(orig/f'espress-five-four-{slug}-community-mirror.pdf');rows=[];events=[];unit=None;unparsed=[]
 for n in range(start,end+1):
  ls=[l for b in d[n-1].get_text('rawdict')['blocks']for l in b.get('lines',[])];ls.sort(key=lambda l:(0 if l['bbox'][0]<(left+right)/2 else 1,l['bbox'][1],l['bbox'][0]))
  for l in ls:
   ss=l['spans'];first=ss[0];x=l['bbox'][0];y=l['bbox'][1];full=''.join(norm(c['c'])for s in ss for c in s['chars']).strip();compact=re.sub(r'\s+','',full)
   if re.fullmatch(r'Unit\d+',compact):unit='Unit '+re.search(r'\d+',compact)[0];events.append([n,unit]);continue
   if not(45<y<d[n-1].rect.height-52):continue
   if not(any(a-9<x<a+3 for a in [left,right])):continue
   if not first['font'].startswith(('EU-HZ','EU-BZ')):continue
   if not unit:continue
   cs=[];started=False
   for s in ss:
    if s['font'].startswith('EU-BX'):break
    for c in s['chars']:
     ch=norm(c['c'])
     if ch=='/'and s['font'].startswith('EU-BZ'):break
     if re.search('[\u4e00-\u9fff]',ch):break
     cs.append(c)
    else:continue
    break
   h=spaced(cs).strip();star=h.startswith('*');h=h.lstrip('* ').strip()
   if not re.match('[A-Za-z(]',h):
    if first['font'].startswith('EU-HZ')and full and not full.startswith(('Words','Appendix')):unparsed.append({'page':n,'full':full,'bbox':l['bbox']})
    continue
   if h in ['n.','v.','adj.','adv.']:continue
   rows.append({'headword':h,'label_as_printed':h,'unit_label':unit,'parent_pdf_page':n,'source_headword_native_unreviewed':full,'headword_bbox':l['bbox'],'source_star':star,'source_star_classification_reviewed':False,'source_bold':None,'pronunciation':None,'chinese_gloss':None,'commercial_reuse_approved':False,'review_status':'draft_pending_visual_review'})
 data={'book_slug':slug,'entries':rows,'heading_events':events,'unparsed_head_candidates':unparsed,'entry_count':len(rows)};(f/'unit-wordlists-draft.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n');(f/'headword-review.txt').write_text('\n'.join(f"p{n} [{len(es)}] "+' | '.join(e['headword']for e in es)for n in range(start,end+1)if(es:=[e for e in rows if e['parent_pdf_page']==n])))
 print(slug,len(rows),'groups',len(set(e['unit_label']for e in rows)),'unparsed',len(unparsed),events,flush=True)
