const { expect, test } = require('@playwright/test');
import { MainMenu } from "../menu/mainMenu";

export class CataloguePage {
 
  constructor(page) {
    this.page = page;
    this.mainMenu = new MainMenu(page);
}

  async navigateMainMenu(name) {
    await test.step(`Click to check ${name}`, async () => {
      await this.mainMenu.navigateMenuItem(name);
    })
  }

  async selectCatalogItem(name) {
    await test.step(`Click to check ${name}`, async () => {
      await this.mainMenu.selectCatalogItem(name);
    })
  }

  async selectTelevision(name) {
    await test.step(`Click to check ${name}`, async () => {
      await this.mainMenu.selectTelevision(name);
    })
  }

  async selectTV(name) {
    await test.step(`Click to check ${name}`, async () => {
      await this.mainMenu.selectTV(name);
    })
  }

}


  