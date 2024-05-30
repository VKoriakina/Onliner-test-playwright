const { expect, test } = require('@playwright/test');
import { MainMenu } from "../menu/mainMenu";

export class MainPage {

  constructor(page) {
    this.page = page;
    this.mainMenu = new MainMenu(page);

  }

  async navigateMainMenu(name) {
    await test.step(`Click to check ${name}`, async () => {
      await this.mainMenu.navigateMenuItem(name);
    })
  }

};
