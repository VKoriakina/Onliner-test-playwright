import {test, expect } from '../fixtures';
import { homePage} from '../pages/homePage';
import { navigation } from '../pages/navigation';
import {filter} from '../pages/filter';

test('tv filter validation', async ({ page, tv }) => {
  const Catalog = new homePage(page);
  const TV = new navigation(page);
  const Filter = new filter(page);

  await Catalog.goto();
  await Catalog.goToCatalog();
  await Catalog.confirmCache();
  await TV.goToTV();
  await Filter.selectTitle(tv.title);
  await Filter.selectPrice();
  await Filter.selectResolution();
  await Filter.selectDiagonal1();
  await Filter.selectDiagonal2();
 
  const searchElementClass = page.locator("//div[@class='catalog-form__offers-list']");
  expect(await searchElementClass.count()).toBeGreaterThan(0);
  const searchTitles = await searchElementClass.locator("//a[@class='catalog-form__link catalog-form__link_primary-additional catalog-form__link_base-additional catalog-form__link_font-weight_semibold catalog-form__link_nodecor']").allInnerTexts();
  const searchPrice = await searchElementClass.locator("//a[@class='catalog-form__link catalog-form__link_nodecor catalog-form__link_primary-additional catalog-form__link_huge-additional catalog-form__link_font-weight_bold']").allInnerTexts();
  const searchSize = await searchElementClass.locator("//div[@class ='catalog-form__parameter-part catalog-form__parameter-part_1' ]/child::*[1]").allInnerTexts();

  // TITLE CHECK
  searchTitles.forEach((result, index) => {
      expect(result, `row #${index} should contain ${tvTitle}`).toContain(tvTitle);
  });
   
// PRICE CHECK
  const price = 1500.00;
  const numbers = searchPrice.map(price => {
    // Удаляем все символы, кроме цифр и запятой
    const numericString = price.replace(/[^\d,]/g, '');
    // Заменяем запятую на точку, чтобы можно было использовать parseFloat
    const floatNumber = parseFloat(numericString.replace(',', '.'));
    return floatNumber;
  })
  numbers.forEach((result, index)=>{
    expect(result, `price #${index} should be less than ${price}`).toBeLessThan(price);
  })


  // RESOLUTION CHECK
  const resolution = '1920x1080 (Full HD)';
  searchSize.forEach((result, index) => {
    expect(result, `row #${index} should contain ${resolution}`).toContain(resolution);
});


// DIAGONAL CHECK
  const diag1 = 40;
  const diag2 = 50; 
// Регулярное выражение для поиска чисел в начале строки
  const pattern = /^\d+/;
// Извлечение чисел из строк
  const diag = searchSize.map(s => {
    const match = s.match(pattern);
    return match ? parseInt(match[0], 10):null;
  });
  const isInRange = (size) => size >= 40 && size <= 50;
  // Проверяем каждое значение в массиве
  diag.forEach((size, index) => {
    expect(isInRange(size), `Diagonal #${index} (${size}) should be in range 40-50`).toBe(true);
  });
});
