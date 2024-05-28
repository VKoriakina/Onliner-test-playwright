const { expect, test } = require('@playwright/test');

exports.Catalog = class Catalog {
 
  constructor(page) {
    this.page = page;
}

  getCatalogLocator(item) {
    return this.page.locator(`//span[@class='catalog-navigation-classifier__item-title-wrapper' and  contains(text(), '${item}')]`);
  }
  async selectCatalogItem(name) {
    await test.step(`Click to check ${name}`, async () => {
      await this.getCatalogLocator(name).click();
    })
  }

  getTelevisionLocator (item) {
    return this.page.locator(`//div[@class='catalog-navigation-list__aside-title' and contains(text(), '${item}')]`);
  }

  async selectTelevision(name) {
    await test.step(`Click to check ${name}`, async () => {
      await this.getTelevisionLocator(name).hover();
    })
  }

  getTvLocator (item) {
    return this.page.locator(`//span[@class='catalog-navigation-list__dropdown-title' and contains(text(), '${item}')]`);
  }

  async selectTV(name) {
    await test.step(`Click to check ${name}`, async () => {
      await this.getTvLocator(name).click();
    })
  }

};


  