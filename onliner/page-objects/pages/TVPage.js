const { expect, test } = require('@playwright/test');


exports.TVPage = class TVPage {

  constructor(page) {
    this.page = page;
    this.root = page.locator("//div[@class='catalog-form__offers-list']");
    this.arrTitles = this.root.locator("//a[@class='catalog-form__link catalog-form__link_primary-additional catalog-form__link_base-additional catalog-form__link_font-weight_semibold catalog-form__link_nodecor']");
    this.arrPrice = this.root.locator("//a[@class='catalog-form__link catalog-form__link_nodecor catalog-form__link_primary-additional catalog-form__link_huge-additional catalog-form__link_font-weight_bold']")
    this.fldPriceDo = page.locator('//input[@type = "text" and @placeholder = "до"]');
    this.arrDetails = this.root.locator("//div[@class ='catalog-form__parameter-part catalog-form__parameter-part_1' ]/child::div[1]");
  }
  chbLocator(item) {
    return this.page.locator(`//div[@class='catalog-form__checkbox-sign' and text()='${item}']`);
  }
  chbDiagonalLocator(item) {
    return this.page.locator(`//div[@class='catalog-form__checkbox-sign' and  contains(text(), '${item}"')]`);
  }



  async selectTitle(name) {
    await test.step(`Click to check ${name}`, async () => {
      const titlePromise = this.page.waitForResponse('**/search/**');
      await this.chbLocator(name).click();
      await titlePromise;
    })
  };

  async selectResolution (name) {
    await test.step(`Select resolution ${name}`, async () => {
      const resolutionPromise = this.page.waitForResponse('**/search/**');
      await this.chbLocator(name).click();
      await resolutionPromise;
    })
  };

  async selectDiagonalMin(name) {
    await test.step(`Select diagonal min ${name}`, async () => {
      const diagonalPromise = this.page.waitForResponse('**/search/**');
      await this.chbDiagonalLocator(name).click();
      await diagonalPromise;
    })
  };

  async selectDiagonalMax(name) {
    await test.step(`Select diagonal max ${name}`, async () => {
      const diagonalPromise = this.page.waitForResponse('**/search/**');
      await this.chbDiagonalLocator(name).click();
      await diagonalPromise;
    })
  }

  async selectPrice(name) {
    await test.step(`Select price ${name}`, async () => {
      const pricePromise = this.page.waitForResponse('**/search/**');
      await this.fldPriceDo.fill(name);
      await pricePromise;
    });
  };

  // TITLE CHECK
  async checkTitles(tv) {
    const searchTitles = this.arrTitles;
    expect(await searchTitles.count(), 'should have at least one item').toBeGreaterThan(0);
    for (const titleLocator of await searchTitles.all()) {
      await expect.soft(titleLocator, `should contain ${tv.title}`).toContainText(tv.title);
    }
  }


  // PRICE CHECK
  async checkPrice(tv) {
    const searchPrice = await this.arrPrice.allInnerTexts();
    await expect(searchPrice.length, 'should have at least one item').toBeGreaterThan(0);
    const numbers = searchPrice.map(price => {
      const numericString = price.replace(/[^\d,]/g, '');
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
    const arrResolution = this.arrDetails;
    expect(await arrResolution.count(), 'should have at least one item').toBeGreaterThan(0);
    for (const sizeLocator of await arrResolution.all()) {
      await expect.soft(sizeLocator, `should contain ${tv.resolution}`).toContainText(tv.resolution);
    }
  }

  // DIAGONAL CHECK
  async checkDiagonal(tv) {
    const arrDiagonal = await this.arrDetails.allInnerTexts();
    await expect(arrDiagonal.length, 'should have at least one item').toBeGreaterThan(0);
    const sizeNumbers = arrDiagonal.map(s => {
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

