const base = require('@playwright/test');

const myFirstFixture = {
    // Define an option and provide a default value.
    // We can later override it in the config.
    person: ['John', { option: true }],

    tvTitle: [
        'Samsung',
        {
            option: true,
        }
    ]
};

exports.test = base.test.extend(myFirstFixture);

exports.expect = base.expect;