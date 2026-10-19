import {it,expect} from 'vitest'
import {editionText,editionQuestion} from './core/spelling'
import {authorCatalog} from '../scripts/lib/author-content.mjs'
import {createLessonTeaching} from './core/lesson-teaching'
it('maps whole singular/plural metric words in both directions without altering other words or numbers',()=>{
 const uk='One centimetre, ten centimetres; one metre and forty metres. A kilometre is 1,000 metres.',us='One centimeter, ten centimeters; one meter and forty meters. A kilometer is 1,000 meters.'
 expect(editionText(uk,'american')).toBe(us);expect(editionText(us,'british')).toBe(uk)
 expect(editionText('Geometry and centimetre-scale diagrams.','american')).toBe('Geometry and centimeter-scale diagrams.')
 expect(editionText('Two parking meters, one water meter and a meter reading.','british')).toBe('Two parking meters, one water meter and a meter reading.')
 expect(editionText('A 100-meter race and a twenty-meter path.','british')).toBe('A 100-metre race and a twenty-metre path.')
})
it('renders source examples and authored workshop explanations in the selected edition while preserving the original material',()=>{
 const c=authorCatalog(process.cwd()),lesson=c.lessons.find(l=>l.id==='l-v-course-quantity-2')!,raw=JSON.stringify(lesson)
 const us=createLessonTeaching(c,lesson,'american'),uk=createLessonTeaching(c,lesson,'british')
 expect(us.mission!.workshop!.items[2].material).toBe('Leave ten centimeters between the seeds.')
 expect(uk.mission!.workshop!.items[2].material).toBe('Leave ten centimetres between the seeds.')
 const q=c.questions.find(q=>q.id==='q-v-course-quantity-ten')!
 expect(editionQuestion(q,'american').stem).toContain('centimeters');expect(editionQuestion(q,'british').stem).toContain('centimetres')
 expect(JSON.stringify(lesson)).toBe(raw)
})
