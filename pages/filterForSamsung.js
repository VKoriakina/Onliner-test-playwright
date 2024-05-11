const { expect } = require('@playwright/test');

exports.filterForSamsung = class filterForSamsung {
 
  constructor(page) {
    this.page = page;
    this.samsung = page.locator("//div[@class='catalog-form__checkbox-sign' and text()='Samsung']");
    this.priceDo = page.getByPlaceholder('до');
    this.resolution = page.locator("//div[@class='catalog-form__checkbox-sign' and text() ='1920x1080 (Full HD)']");
    this.diagonalOt = page.getByRole('combobox').first();
    this.diagonalDo = page.getByRole('combobox').nth(1);

  }

  async selectSumsung() {
    await this.samsung.click();
  }

  async selectPrice() {
    await this.priceDo.fill('1500');
  }


  async selectResolution() {
    await this.resolution.click();
  }

  async selectDiagonal() {
    await this.diagonalOt.selectOption('400');
    await this.diagonalDo.selectOption('500');
  }
};
