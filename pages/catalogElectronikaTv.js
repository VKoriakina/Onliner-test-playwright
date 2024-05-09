const { expect } = require('@playwright/test');

exports.catalogElectronikaTv = class catalogElectronikaTv {
 
  constructor(page) {
    this.page = page;
    this.electronika = page.locator(('li').filter({ hasText: 'Электроника' }));
    this.televidenie = page.getByText('Телевидение и видео');
    this.tv = page.getByRole('link', { name: 'Телевизоры' });

  }

  async goToTV() {
    await this.electronika.click();
    await this.televidenie.click();
    await this.tv.click()
    await expect(page.url()).toBe('https://catalog.onliner.by/tv');
  }

};