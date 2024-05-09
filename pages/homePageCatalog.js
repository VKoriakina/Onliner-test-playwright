const { expect } = require('@playwright/test');

exports.homePageCatalog = class homePageCatalog {
 
  constructor(page) {
    this.page = page;
    this.catalogLink = page.locator(getByRole('navigation').getByRole('link', { name: 'Каталог' }));
    this.cachePopup =page.locator(getByRole('heading', { name: 'Заботясь о вашей конфиденциальности, мы просим вас дать согласие на обработку и ' }))
    this.confirmButton = page.locator(getByLabel('Соглашаюсь', { exact: true }));
  }

  async goto() {
    await this.page.goto('https://www.onliner.by/');
  }

  async goToCatalog() {
    await this.catalogLink.first().click();
    await expect(this.cachePopup).toBeVisible();
  }

  async confirmCache() {
    await this.confirmButton.click();
  }

};