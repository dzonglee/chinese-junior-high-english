// Original vector paths adapted from the owner's maths app (933ab32).
// Optional artwork build; committed PNGs require no browser during normal compilation.
import {chromium} from '@playwright/test'
import {mkdirSync} from 'node:fs'
const icons={
 home:'<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17M8.8 15.2l2.2 2.1 4.4-4.4"/>',
 learn:'<path d="M12 6.5C10 5 7 4.6 3.5 5v13.5c3.5-.4 6.5 0 8.5 1.5 2-1.5 5-1.9 8.5-1.5V5C17 4.6 14 5 12 6.5zM12 6.5V20"/>',
 practice:'<path d="M15.5 4.5l4 4L9 19H5v-4L15.5 4.5zM13 7l4 4"/>',
 mistakes:'<rect x="5" y="3.5" width="14" height="17" rx="2.5"/><path d="M8.5 3.5v17M12 10l4 4M16 10l-4 4"/>',
 profile:'<circle cx="12" cy="8.5" r="4"/><path d="M4.5 20c.8-3.8 3.9-6 7.5-6s6.7 2.2 7.5 6"/>',
}
const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']})
try{const p=await b.newPage({viewport:{width:81,height:81},deviceScaleFactor:1});mkdirSync('miniprogram/assets/navigation',{recursive:true});for(const [name,body]of Object.entries(icons))for(const on of [false,true]){await p.setContent(`<style>html,body{margin:0;background:transparent}svg{display:block}</style><svg xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 24 24" fill="none" stroke="${on?'#ffffff':'#8A93A3'}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`);await p.screenshot({path:`miniprogram/assets/navigation/${name}${on?'-on':''}.png`,omitBackground:true})}console.log('10 crisp navigation icons generated.')}finally{await b.close()}
