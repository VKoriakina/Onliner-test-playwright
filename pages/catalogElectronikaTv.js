const { expect } = require('@playwright/test');

exports.catalogElectronikaTv = class catalogElectronikaTv {
 
  constructor(page) {
    this.page = page;
    this.electronika = page.getByText('Электроника');
    this.televidenie = page.getByText('Телевидение и видео');
    this.tv = page.locator('//span[@class="catalog-navigation-list__dropdown-title" and contains(text(), "Телевизоры")]');  
}

  async goToTV() {
    await this.electronika.click();
    await this.televidenie.click();
    await this.tv.click();
  }

};


  