import { test, expect } from '@playwright/test';
import { homePageCatalog } from '../pages/homePageCatalog';


test('test', async ({ page }) => {
  const Catalog = new homePageCatalog(page);
  await Catalog.goto();
  await Catalog.goToCatalog();
  await Catalog.confirmCache();

});