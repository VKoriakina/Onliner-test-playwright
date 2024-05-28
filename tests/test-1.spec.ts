import {test, expect } from '../fixtures';
import {HomePage } from '../page-objects/main-menu/homePage';
import {Catalog } from '../page-objects/main-menu/catalogPage';
import {Filter} from '../page-objects/pages/filterPage';

test('tv filter validation', async ({ page, tv,catalogItems }) => {
  const homePage = new HomePage(page);
  const catalog = new Catalog(page);
  const filter = new Filter(page);

  await homePage.navigateTo();
  await homePage.goToCatalog();
  await homePage.confirmCache();
  await catalog.selectCatalogItem(catalogItems.menu);
  await catalog.selectTelevision(catalogItems.submenu);
  await catalog.selectTV(catalogItems.subsubmenu);
  await filter.selectTitle(tv.title);
  await filter.selectPrice(tv.price);
  await filter.selectResolution(tv.resolution);
  await filter.selectDiagonalMin(tv.diagonalMin);
  await filter.selectDiagonalMax(tv.diagonalMax);
  await filter.checkTitles(tv);
  await filter.checkPrice(tv);
  await filter.checkResolution(tv);
  await filter.checkDiagonal(tv);

});
