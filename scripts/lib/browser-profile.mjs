// Follow the public three-step onboarding flow; settings remain editable on one page.
export async function fillInitialProfile(page,values){
 for(const name of ['cityId','structure'])if(values[name]!==undefined)await page.selectOption(`[name=${name}]`,values[name])
 await page.locator('[data-action=setup-next]').click()
 for(const name of ['grade','term','editionId'])if(values[name]!==undefined)await page.selectOption(`[name=${name}]`,values[name])
 await page.locator('[data-action=setup-next]').click()
 for(const name of ['dailyMinutes','schoolYear','examDate'])if(values[name]!==undefined){const f=page.locator(`[name=${name}]`);if(name==='dailyMinutes')await f.selectOption(values[name]);else await f.fill(values[name])}
}
export async function openCourseFilters(page){const b=page.locator('[data-action=course-filters]');if(await b.getAttribute('aria-expanded')!=='true')await b.click()}
