import { test, expect} from '../../fixtures';
import {MainPage } from '../page-objects/pages/mainPage';
import {CataloguePage} from '../page-objects/pages/cataloguePage';
import {TVPage} from '../page-objects/pages/TVPage';
import {Browser} from '../framework/browser';

test('tv filter validation', async ({page, tv}, testInfo) => {

  const mainPage = new MainPage(page);
  const cataloguePage = new CataloguePage(page);
  const TvPage = new TVPage(page);
  const browser =new Browser(page);

  await browser.navigateToMainPage();
  await mainPage.navigateMainMenu('Каталог');
  await cataloguePage.selectCatalogItem('Электроника');
  await cataloguePage.selectTelevision('Телевидение');
  await cataloguePage.selectTV('Телевизоры');
  await TvPage.selectTitle(tv.title);
  await TvPage.selectPrice(tv.price);
  await TvPage.selectResolution(tv.resolution);
  await TvPage.selectDiagonalMin(tv.diagonalMin);
  await TvPage.selectDiagonalMax(tv.diagonalMax);
  await TvPage.checkTitles(tv);
  await TvPage.checkPrice(tv);
  await TvPage.checkResolution(tv);
  await TvPage.checkDiagonal(tv);

});
