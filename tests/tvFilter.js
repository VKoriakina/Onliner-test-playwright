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
});