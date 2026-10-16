import fitz,pathlib,json,hashlib,shutil
r=pathlib.Path('/tmp/english-vocabulary-bnu-audit');(r/'ready/files').mkdir(parents=True,exist_ok=True)
fitz.TOOLS.mupdf_display_errors(False);fitz.TOOLS.mupdf_display_warnings(False)
for f in sorted(r.glob('grade*')):
 if not f.is_dir():continue
 p=json.load(open(f/'parent-provenance.json'));pages=p['retained_parent_pdf_pages'];parent=fitz.open(p['parent_local_path']);before=[]
 for n in pages:
  page=parent[n-1];pix=page.get_pixmap(matrix=fitz.Matrix(.45,.45),colorspace=fitz.csRGB,alpha=False);before.append({'parent_pdf_page':n,'rgb_sha256':hashlib.sha256(pix.samples).hexdigest(),'width':pix.width,'height':pix.height,'native_text_sha256':hashlib.sha256(page.get_text().encode()).hexdigest()})
 out=r/'ready/files'/f'bnu-{f.name}-identity-and-lexical-appendices.pdf';parent.select([n-1 for n in pages]);out.unlink(missing_ok=True);parent.save(out,garbage=4,deflate=True);parent.close();der=fitz.open(out)
 for i,e in enumerate(before):
  page=der[i];pix=page.get_pixmap(matrix=fitz.Matrix(.45,.45),colorspace=fitz.csRGB,alpha=False);e['retained_pdf_page']=i+1;e['rgb_equal']=hashlib.sha256(pix.samples).hexdigest()==e['rgb_sha256'];e['native_text_equal']=hashlib.sha256(page.get_text().encode()).hexdigest()==e['native_text_sha256']
 der.close();mismatches=[e['parent_pdf_page']for e in before if not(e['rgb_equal']and e['native_text_equal'])];selected_sha=hashlib.sha256(out.read_bytes()).hexdigest();selected_bytes=out.stat().st_size
 if mismatches:
  out.unlink();out=r/'ready/files'/f'bnu-{f.name}-full-parent.pdf';shutil.copyfile(p['parent_local_path'],out);assert hashlib.sha256(out.read_bytes()).hexdigest()==p['parent_sha256']
 for e in before:
  e['selected_derivative_pdf_page']=e['retained_pdf_page'];e['retained_pdf_page']=e['parent_pdf_page']if mismatches else e['retained_pdf_page']
 wr=fitz.TOOLS.mupdf_warnings();data={'method':'Original parent opened, selected with doc.select using explicit parent page indices, and saved. Every retained page compared against parent RGB pixels at scale 0.45 and entire native text. Visual audit used scale 1.6 page renders made directly from original.','parent_sha256':p['parent_sha256'],'artifact_filename':out.name,'artifact_sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'artifact_bytes':out.stat().st_size,'page_count':len(pages),'retention_mode':'full_unchanged_parent'if mismatches else 'selected_original_pages','selected_derivative_mismatch_parent_pages':mismatches,'selected_derivative_sha256':selected_sha,'selected_derivative_bytes':selected_bytes,'selected_derivative_all_rgb_equal':not mismatches,'selected_derivative_all_native_text_equal':all(e['native_text_equal']for e in before),'retained_artifact_all_reviewed_pages_rgb_equal':True,'retained_artifact_all_reviewed_pages_native_text_equal':True,'retained_artifact_parent_byte_identical':bool(mismatches),'comparisons':before,'processing_warning_line_count':len(wr.splitlines()),'processing_warning_prefix':wr[:500],'commercial_reuse_approved':False};(f/'retention-fidelity.json').write_text(json.dumps(data,indent=2)+'\n');print(f.name,len(pages),out.stat().st_size,flush=True)
