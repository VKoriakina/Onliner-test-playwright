const { expect, test } = require('@playwright/test');


exports.Filter = class Filter {

  constructor(page) {
    this.page = page;
    this.root = this.page.locator("//div[@class='catalog-form__offers-list']");
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
  };

  async selectResolution (name) {
    await test.step(`Select resolution ${name}`, async () => {
      const pricePromise = this.page.waitForResponse('**/search/**');
      await this.getCheckboxLocator(name).click();
      await pricePromise;
    })
  };

  getDiagonalLocator(item) {
    return this.page.locator(`//div[@class='catalog-form__checkbox-sign' and  contains(text(), '${item}"')]`);
  }

  async selectDiagonalMin(name) {
    await test.step(`Select diagonal min ${name}`, async () => {
      const pricePromise = this.page.waitForResponse('**/search/**');
      await this.getDiagonalLocator(name).click();
      await pricePromise;
    })
  };

  async selectDiagonalMax(name) {
    await test.step(`Select diagonal max ${name}`, async () => {
      const pricePromise = this.page.waitForResponse('**/search/**');
      await this.getDiagonalLocator(name).click();
      await pricePromise;
    })
  }

  getFieldLocator() {
    return this.page.locator('//input[@type = "text" and @placeholder = "до"]');
  }

  async selectPrice(name) {
    await test.step(`Select price ${name}`, async () => {
      const pricePromise = this.page.waitForResponse('**/search/**');
      await this.getFieldLocator().fill(name);
      await pricePromise;
    });
  };


  // TITLE CHECK
  async checkTitles(tv) {
    const searchTitles = this.root.locator("//a[@class='catalog-form__link catalog-form__link_primary-additional catalog-form__link_base-additional catalog-form__link_font-weight_semibold catalog-form__link_nodecor']");
    expect(await searchTitles.count(), 'should have at least one item').toBeGreaterThan(0);
    for (const titleLocator of await searchTitles.all()) {
      await expect.soft(titleLocator, `should contain ${tv.title}`).toContainText(tv.title);
    }
  }


  // PRICE CHECK
  async checkPrice(tv) {
    const searchPrice = await this.root.locator("//a[@class='catalog-form__link catalog-form__link_nodecor catalog-form__link_primary-additional catalog-form__link_huge-additional catalog-form__link_font-weight_bold']").allInnerTexts();
    await expect(searchPrice.length, 'should have at least one item').toBeGreaterThan(0);
    const numbers = searchPrice.map(price => {
      // Удаляем все символы, кроме цифр и запятой
      const numericString = price.replace(/[^\d,]/g, '');
      // Заменяем запятую на точку, чтобы можно было использовать parseFloat
      const floatNumber = parseFloat(numericString.replace(',', '.'));
      return floatNumber;
    })
    const intPrice = Number.parseInt(tv.price);
    for (const num of await numbers) {
      await expect.soft(num, `should be less than ${tv.price}`).toBeLessThan(intPrice);
    }
  };

  // RESOLUTION CHECK
  async checkResolution(tv) {
    const searchSize = this.root.locator("//div[@class ='catalog-form__parameter-part catalog-form__parameter-part_1' ]/child::*[1]");
    expect(await searchSize.count(), 'should have at least one item').toBeGreaterThan(0);
    for (const sizeLocator of await searchSize.all()) {
      await expect.soft(sizeLocator, `should contain ${tv.resolution}`).toContainText(tv.resolution);
    }
  }

  // DIAGONAL CHECK
  async checkDiagonal(tv) {
    const searchSize = await this.root.locator("//div[@class ='catalog-form__parameter-part catalog-form__parameter-part_1' ]/child::*[1]").allInnerTexts();
    await expect(searchSize.length, 'should have at least one item').toBeGreaterThan(0);
    const sizeNumbers = searchSize.map(s => {
      const [size] = s.split(' ');
      return Number.parseInt(size);
    });
    for (const diag of sizeNumbers) {
      await expect.soft(diag, `should be greater than ${tv.diagonalMin}`).toBeGreaterThanOrEqual(tv.diagonalMin);
    }
    for (const diag of sizeNumbers) {
      await expect.soft(diag,`should be less than ${tv.diagonalMax}`).toBeLessThanOrEqual(tv.diagonalMax);
    }
    }
    }

