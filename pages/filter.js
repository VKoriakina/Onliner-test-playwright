const { expect, test } = require('@playwright/test');

exports.filter = class filter{
 
  constructor(page) {
    this.page = page;
    this.priceDo = page.getByPlaceholder('до');
    this.diagonalOt = page.getByRole('combobox').first();
    this.diagonalDo = page.getByRole('combobox').nth(1);
  }

  getCheckboxLocator(item) {
    return this.page.locator(`//div[@class='catalog-form__checkbox-sign' and text()='${item}']`);
  }

  async selectTitle(name) {
    await test.step(`Click to check ${name}`, async () => {
      const pricePromise = this.page.waitForResponse('**/search/**');
      await this.getCheckboxLocator(name).click();
      await pricePromise;
    })
  }

  async selectPrice(price = '1500') {
    await test.step('Select price', async () => {
      const pricePromise = this.page.waitForResponse('**/search/**');
      await this.priceDo.fill(price);
      await pricePromise;
    })
  }


  async selectResolution(resolution) {
    await test.step('Select resolution', async () => {
      const pricePromise = this.page.waitForResponse('**/search/**');
      await this.getCheckboxLocator(resolution).click();
      await pricePromise;
    })
  }

  async selectDiagonal1() {
   await test.step('Select diagonal', async () => {
    const pricePromise = this.page.waitForResponse('**/search/**');
    await this.diagonalOt.selectOption('400');
    await pricePromise;
   })
  }

  async selectDiagonal2() {
    await test.step('Select diagonal', async () => {
      const pricePromise = this.page.waitForResponse('**/search/**');
     await this.diagonalDo.selectOption('500');
     await pricePromise;
    })
   }
};
