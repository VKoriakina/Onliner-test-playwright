const base = require('@playwright/test');

const myFirstFixture = {
    // Define an option and provide a default value.
    // We can later override it in the config.

    tv: [
        {
            title: 'Samsung',
            diagonalMax: 50,
            diagonalMin: 40,
            resolution: '1920x1080 (Full HD)',
            price: "1500"
        },
        {
            option: true,
        }
    ],

    catalogItems: [
        {
            menu: 'Электроника',
            submenu: 'Телевидение',
            subsubmenu: 'Телевизоры'
        },
        {
            option: true,
        }
    ]
};

exports.test = base.test.extend(myFirstFixture);

exports.expect = base.expect;