const { expect, test } = require('@playwright/test');

exports.HomePage = class HomePage {

  constructor(page) {
    this.page = page;
    this.cachePopup =page.getByText('Персонализированная реклама и контент, определение эффективности рекламы и конте');
    this.confirmButton = page.getByLabel('Соглашаюсь', { exact: true });
  }

  async navigateTo() {
    await test.step('Site page opening', async ()=>{
      await this.page.goto('https://www.onliner.by/');
    })
  }

  async goToCatalog() {
   await test.step('Cookie pop-up appeared', async ()=>{
     await this.page.goto('https://catalog.onliner.by/')
     await expect(this.cachePopup).toBeVisible();
   })
  }

  async confirmCookie() {
    await test.step('Confirm cookie', async ()=> {
      await this.confirmButton.click();
    })
  }

};
