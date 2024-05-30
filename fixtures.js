const base = require('@playwright/test');
const testDataJson = require('./onliner/test-data/testData.json');


const fixtures = {
    tv: [ testDataJson.tv, { option: true} ],

    async page({page}, use){
        // chromium
        const context = await base.chromium.launchPersistentContext('', {
            channel: 'chrome'
        });
        const customPage = await context.newPage();

        console.log('creating new custom page');
        await use(customPage);
    }

}

const test = base.test.extend(fixtures);
const { expect } = base;

module.exports = {
    test,
    expect
};