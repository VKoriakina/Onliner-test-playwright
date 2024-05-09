const { expect } = require('@playwright/test');

exports.homePageCatalog = class homePageCatalog {
 
  constructor(page) {
    this.page = page;
    this.cachePopup =page.getByText('Персонализированная реклама и контент, определение эффективности рекламы и конте');
    this.confirmButton = page.getByLabel('Соглашаюсь', { exact: true });
  }

  async goto() {
    await this.page.goto('https://www.onliner.by/');
  }

  async goToCatalog() {
    await this.page.goto('https://catalog.onliner.by/')
    await expect(this.cachePopup).toBeVisible();
  }

  async confirmCache() {
    await this.confirmButton.click();
  }

};