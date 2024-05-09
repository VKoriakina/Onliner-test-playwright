const { expect } = require('@playwright/test');

exports.filterForSamsung = class filterForSamsung {
 
  constructor(page) {
    this.page = page;
    this.samsung = page.locator('li:nth-child(2) > .catalog-form__checkbox-label > .i-checkbox > .i-checkbox__faux')
    this.priceDo = page.getByPlaceholder('до');
    this.resolution = page.getByRole('listitem').filter({ hasText: '1920x1080 (Full HD)' }).locator('div');
    this.diagonalOt = page.getByRole('combobox').first();
    this.diagonalDo = page.getByRole('combobox').nth(1);

  }

  async selectSumsung() {
    await this.sumsung.click();
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
