import json,pathlib,collections,copy,re
r=pathlib.Path('/tmp/english-vocabulary-espress-audit')
fixes={'grade6-lower':{'be expecting(a baby)':'be expecting (a baby)'},'grade7-upper':{'by oneself (':'by oneself'},'grade7-lower':{'pick up (':'pick up','GPS(= Global Positioning System)':'GPS (= Global Positioning System)','advertisement(=ad)':'advertisement (= ad)'},'grade8-lower':{'climber /':'climber','blast off (':'blast off','UK(= United Kingdom)':'UK (= United Kingdom)'},'grade9-upper':{'check in (':'check in','economy class (':'economy class','business class (':'business class','USSR(Union of Soviet Socialist Republics)':'USSR (Union of Soviet Socialist Republics)','worldwid':'worldwide'},'grade9-lower':{'running time (':'running time'}}
adds={'grade7-upper':[(121,'Unit 3','turtle',55.636,385.661)],'grade7-lower':[(116,'Unit 1','shell',65,652.69)],'grade8-lower':[(119,'Unit 4','March of the Volunteers',276.831,222.475),(119,'Unit 5','Guinness Book of World Records',276.831,545.995),(122,'Unit 11','Planet of the Apes',277.551,89.035)],'grade9-upper':[(118,'Unit 7','frequently',277,281.25),(118,'Unit 8','The Phantom of the Opera',276.653,537.739),(119,'Unit 8','population',65,558.69),(119,'Unit 8','unique',277,134.61)],'grade9-lower':[(111,'Unit 6','throat',58,305.45),(111,'Unit 7','behave',269,338.85),(111,'Unit 8','estate',269,529.40),(111,'Unit 8','item',269,633.65)]}
for f in sorted(r.glob('grade*')):
 if not f.is_dir():continue
 corrections=[]
 if f.name=='grade6-upper':
  es=[]
  for line in(f/'manual-reviewed.tsv').read_text().splitlines():
   p,u,hs=line.split('\t')
   for h in hs.split('|'):es.append({'headword':h,'label_as_printed':h,'unit_label':u,'parent_pdf_page':int(p),'extraction_method':'manual transcription of rendered image appendix','source_headword_native_unreviewed':None,'headword_bbox':None})
 else:
  d=json.load(open(f/'unit-wordlists-draft.json'));es=d['entries']
  for e in es:
   h=e['headword']
   if h in fixes.get(f.name,{}):
    e['headword']=e['label_as_printed']=fixes[f.name][h];corrections.append({'parent_pdf_page':e['parent_pdf_page'],'before':h,'after':e['headword'],'reason':'Rendered label boundary / punctuation review; Chinese explanation or IPA separator excluded; explicit abbreviation spacing normalized.'})
   e['extraction_method']='native PDF text headword candidate, visually checked against rendered unit-list page'
  for p,u,h,x,y in adds.get(f.name,[]):
   es.append({'headword':h,'label_as_printed':h,'unit_label':u,'parent_pdf_page':p,'headword_bbox':[x,y,x+1,y+1],'extraction_method':'manual restoration from rendered unit-list page','source_headword_native_unreviewed':None});corrections.append({'parent_pdf_page':p,'before':None,'after':h,'reason':'Restored visually verified headword omitted by native font encoding or italic/star font filtering. Approximate ordering anchor, not a measured text extent.'})
  # Sort by literal page, reading column and top-to-bottom; manual additions approximate order only.
  es.sort(key=lambda e:(e['parent_pdf_page'],0 if e['headword_bbox'][0]<200 else 1,e['headword_bbox'][1]))
 for i,e in enumerate(es,1):
  candidate=e.pop('source_star',None);e['native_star_candidate_unreviewed']=candidate;e['source_star']=None;e['source_star_classification_reviewed']=False;e['source_bold']=None;e['pronunciation']=None;e['chinese_gloss']=None;e['commercial_reuse_approved']=False;e['review_status']='literal_headword_unit_and_pdf_page_visually_reviewed';e['occurrence_index']=i
 counts=collections.Counter(e['unit_label']for e in es)
 out={'schema_version':1,'book_slug':f.name,'source_id':None,'entry_count':len(es),'unit_counts':[{'unit_label':u,'entry_count':n}for u,n in sorted(counts.items(),key=lambda t:int(t[0].split()[-1]))],'entries':es,'curation_corrections':corrections,'review_scope':'Every retained identity and lexical appendix page rendered and visually opened. Unit-list headword labels, literal unit boundaries and parent PDF pages curated. IPA, Chinese gloss, bold/italic/star meaning and first-lesson-page columns are not transcribed or verified per entry. Alphabetical list and supplementary lexical tables retained as evidence, not counted again. Whitespace/punctuation spacing normalized for readable strings; original pages are authority.','commercial_reuse_approved':False}
 (f/'unit-wordlists.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n');print(f.name,len(es),len(counts))
