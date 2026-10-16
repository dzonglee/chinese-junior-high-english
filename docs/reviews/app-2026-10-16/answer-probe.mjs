import{readFileSync,readdirSync}from'node:fs';
import{resolve}from'node:path';
import{pathToFileURL}from'node:url';
const root=resolve(process.argv[2]||process.cwd());
const{checkAnswer}=await import(pathToFileURL(resolve(root,'src/core/answers.ts')));
const qs=readdirSync(root+'/dist/packs').filter(f=>f.endsWith('.json')).flatMap(f=>JSON.parse(readFileSync(root+'/dist/packs/'+f,'utf8')).questions);const cases=[
 ['q-g-present-002','wash','A different ordinary verb also forms a correct habitual-present sentence; prompt gives no base verb.'],
 ['q-g-past-002','lost','Same past tense and coherent meaning; prompt gives no base verb.'],
 ['q-g-future-002','will end','Same future construction and coherent event; prompt gives no base verb.'],
 ['q-g-perfect-010','has fixed','Same meaning and present-perfect construction as has repaired.'],
 ['q-g-passive-002','was repaired','Correct past passive; prompt never says the bridge was built.'],
 ['q-g-modals-002','cannot','No swimming explicitly licenses cannot as a prohibition.'],
 ['q-g-infinitives-002','to get','A valid purpose infinitive with the same ordinary bread-shopping meaning.'],
 ['q-g-gerunds-002','painting','A valid gerund and action on a model; no supplied make cue.'],
 ['q-g-object-clauses-006','where the library is','A correct declarative-order object clause; prompt contains no model/question-word cues.'],
 ['q-g-object-clauses-002','if','If and whether are both valid after wonder here.'],
 ['q-g-relatives-002','that','That and which both introduce this defining object-relative clause.'],
 ['q-g-relatives-003','which','Which and that both introduce this defining subject-relative clause.'],
 ['q-g-pronouns-002','mine','Both rulers can belong to me; prompt never identifies the other possessor.'],
];
const results=cases.map(([id,attempt,reason])=>{const q=qs.find(x=>x.id===id);if(!q)throw Error('Missing '+id);return{id,kind:q.kind,stem:q.stem,accepted:q.answer.accepted,attempt,actual:checkAnswer(q,attempt),expected:true,native_language_reason:reason,lesson_specific_target_constraint_present:false}});
console.log(JSON.stringify({generated_questions:qs.length,reproduced_false_negatives:results.filter(x=>x.actual===false).length,cases:results},null,2));
