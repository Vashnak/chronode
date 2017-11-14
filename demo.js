const chronode = require('./chronode.min');

chronode.start('My measurement');

setTimeout(() => {
    chronode.step('My measurement', 'First timeout');
    setTimeout(() => {
        chronode.step('My measurement', 'Second timeout');
        setTimeout(() => {
            chronode.step('My measurement', 'Third timeout');
            setTimeout(() => {
                chronode.stop('My measurement', 'Last timeout');
                chronode.print('My measurement');
                console.log(JSON.stringify(chronode.getMeasurement('My measurement')));
            }, 10);
        }, 40);
    }, 50);
}, 200);