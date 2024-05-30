const { expect, test } = require('@playwright/test');

export class MainMenu {

    constructor(page) {
        this.page = page;
    }

    mainMenuLocator(item) {
        return this.page.locator(`//span[@class ="b-main-navigation__text" and contains(text(), '${item}')]`);
    }

    MenuLocator(item) {
        return this.page.locator(`//span[@class ="catalog-navigation-classifier__item-title-wrapper" and contains(text(), '${item}')]`);
    }

    SubMenuLocator(item) {
        return this.page.locator(`//div[@class ="catalog-navigation-list__aside-title" and contains(text(), '${item}')]`);
    }

    SubsubMenuLocator(item) {
        return this.page.locator(`//span[@class ="catalog-navigation-list__dropdown-title" and contains(text(), '${item}')]`);
    }


    async navigateMenuItem(name) {
            await this.mainMenuLocator(name).click();
    }
    async selectCatalogItem(name) {
        await this.MenuLocator(name).click();
    }
    async selectTelevision(name) {
        await this.SubMenuLocator(name).hover();
    }
    async selectTV(name) {
        await this.SubsubMenuLocator(name).click();
    }
}

