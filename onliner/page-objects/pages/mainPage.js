const { expect, test } = require('@playwright/test');
import { MainMenu} from "../menu/mainMenu";

export class MainPage {

  constructor(page) {
    this.page = page;
    this.mainmenu = new MainMenu(page);
  }


  async navigateMainMenu(name) {
      await this.mainmenu.navigateMenuItem(name);
    }

};
