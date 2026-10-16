import pathlib,fitz,json,re,unicodedata
r=pathlib.Path('/tmp/english-vocabulary-espress-audit')
def norm(t):return unicodedata.normalize('NFKC',t).replace('蒺','’').replace('鄄','-').replace('援','.').replace('\ue10b','’')
def key(h):return re.sub('[^a-z0-9]','',h.lower())
for f in sorted(r.glob('grade*')):
 if not f.is_dir():continue
 p=json.load(open(f/'parent-provenance.json'));d=fitz.open(p['parent_local_path']);a=[]
 if f.name=='grade6-upper':
  (f/'alphabetical-crosscheck.json').write_text(json.dumps({'method':'Rendered all alphabetical pages and confirmed separate cumulative scope. Image-only appendix; no independent machine set-match claimed. Alphabetical list includes pre-learned primary vocabulary absent from each-unit list.','commercial_reuse_approved':False},indent=2)+'\n');continue
 # column starts determined from main draft geometry; alphabetical same starts except grade6lower.
 x1=102 if f.name=='grade6-lower' else 58 if f.name=='grade9-lower' else 65;x2=x1+211
 for n in p['alphabetical_pages']:
  for b in d[n-1].get_text('rawdict')['blocks']:
   for l in b.get('lines',[]):
    ss=l['spans'];x=l['bbox'][0];y=l['bbox'][1]
    if not(45<y<d[n-1].rect.height-52 and any(z-11<x<z+4 for z in[x1,x2])):continue
    if not ss[0]['font'].startswith(('EU-HZ','EU-BZ','EU-HX','EU-BX')) and not ''.join(c['c']for c in ss[0]['chars']).strip().startswith('*'):continue
    out='';prev=None;stop=False
    for s in ss:
     if s['font'].startswith('EU-BX')and out.strip('* '):break
     for c in s['chars']:
      ch=norm(c['c'])
      if (ch=='/'and s['font'].startswith('EU-BZ'))or re.search('[\u4e00-\u9fff]',ch):stop=True;break
      if prev and c['bbox'][0]-prev['bbox'][2]>2 and out[-1:]not in [' ','(','/','-','’']and ch[:1].isalnum():out+=' '
      out+=ch;prev=c
     if stop:break
    h=out.strip().lstrip('* ').rstrip(' (/')
    if re.match('[A-Za-z]',h)and h not in ['n.','v.','adj.','adv.']and not re.fullmatch('[A-Z]',h):a.append({'label_native_candidate':h,'parent_pdf_page':n})
 main=json.load(open(f/'unit-wordlists.json'))['entries'];ak={key(x['label_native_candidate'])for x in a};mk={key(x['headword'])for x in main}
 result={'method':'Independent native alphabetical headword candidates compared to visually curated each-unit labels. Candidate text has font-encoding and explanatory-tail limitations; differences are review evidence, not additional counted entries. All alphabetical pages visually opened.','alphabetical_candidate_count':len(a),'main_occurrence_count':len(main),'main_labels_without_exact_alphabetical_candidate':[{'headword':x['headword'],'parent_pdf_page':x['parent_pdf_page']}for x in main if key(x['headword'])not in ak],'alphabetical_candidates_without_exact_main_label':[x for x in a if key(x['label_native_candidate'])not in mk],'alphabetical_candidates':a,'commercial_reuse_approved':False}
 (f/'alphabetical-crosscheck.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(f.name,'mainOnly',result['main_labels_without_exact_alphabetical_candidate']);print('alphaOnly',result['alphabetical_candidates_without_exact_main_label'])
