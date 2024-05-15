import { test, expect } from '@playwright/test';
import { homePageCatalog } from '../pages/homePageCatalog';
import { catalogElectronikaTv } from '../pages/catalogElectronikaTv';
import {filterForSamsung} from '../pages/filterForSamsung';

test('test', async ({ page }) => {
  const Catalog = new homePageCatalog(page);
  const TV = new catalogElectronikaTv(page);
  const Filter = new filterForSamsung(page);
  await Catalog.goto();
  await Catalog.goToCatalog();
  await Catalog.confirmCache();
  await TV.goToTV();
  await Filter.selectSumsung();
  await Filter.selectPrice();
  await Filter.selectResolution();
  await Filter.selectDiagonal();


  const surchClass = page.locator("//div[@class='catalog-form__offers-list']");
  const surchTitles = await surchClass.locator("//a[@class='catalog-form__link catalog-form__link_primary-additional catalog-form__link_base-additional catalog-form__link_font-weight_semibold catalog-form__link_nodecor']").all();
  expect(await surchClass.count()).toBeGreaterThan(0); 
  // for (const title of surchTitles) {
  //     expect(await title.textContent()).toContain('Samsung');
  // }
  expect(surchTitles).toContain('Samsung');
  
});