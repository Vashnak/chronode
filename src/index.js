const moment = require('moment');

module.exports = {
    measurements: [],

    getMeasurement(measurementName) {
        let measurement = this.measurements.find(m => m.name === measurementName);

        if (!measurement) {
            throw new Error('This measurement (' + measurementName + ') doesn\'t exist.');
        }

        return measurement;
    },

    start(measurementName) {
        this.measurements.push({name: measurementName, startedAt: Date.now(), steps: [], running: true});
    },

    step(measurementName, stepName) {
        if (!stepName) {
            throw new Error('Missing parameter stepName');
        }

        const measurement = this.getMeasurement(measurementName);

        measurement.steps.push({name: stepName, time: Date.now()});
    },

    stop(measurementName, stepName) {
        if (!stepName) {
            throw new Error('Missing parameter stepName');
        }

        const now = Date.now();
        const measurement = this.getMeasurement(measurementName);

        measurement.steps.push({name: stepName, time: now});
        measurement.stoppedAt = now;
        measurement.running = false;
    },

    print(measurementName) {

        if (!measurementName) {
            throw new Error('Missing parameter measurementName');
        }

        const measurement = this.getMeasurement(measurementName);
        const totalTime = measurement.stoppedAt - measurement.startedAt;

        if (measurement.running) {
            throw new Error('Please stop the measurement before printing it.');
        }

        console.log(' **************************************');
        console.log(' *         Measurement result         *');
        console.log(' **************************************');
        console.log('');
        console.log(' # ' + measurementName);
        console.log('   + Started at : ' + formatFullTime(measurement.startedAt));
        console.log('   + Stopped at : ' + formatFullTime(measurement.stoppedAt));

        measurement.steps.forEach((step, index) => {
            let stepTime = index > 0 ? step.time - measurement.steps[index - 1].time : step.time - measurement.startedAt;
            let str = '     > ' + step.name + ' : ' + formatTime(stepTime);
            str += ' (' + colorize('Blue', (stepTime / totalTime * 100).toFixed(1)) + '%)'
            console.log(str)
        });

        console.log('   + Total time : ' + formatTime(totalTime));
    }
};

function formatFullTime(date) {
    let momentObject = moment(date).toObject();
    return momentObject.hours + ':' + +momentObject.minutes + ':' + momentObject.seconds + '.' + momentObject.milliseconds;
}

function formatTime(time) {
    let momentDuration = moment.duration(time);
    let finalString = '';
    if (momentDuration.hours()) finalString += ' ' + colorize('Green', momentDuration.hours().toString()) + 'h';
    if (momentDuration.minutes()) finalString += ' ' + colorize('Green', momentDuration.minutes().toString()) + 'm';
    if (momentDuration.seconds()) finalString += ' ' + colorize('Green', momentDuration.seconds().toString()) + 's';
    if (momentDuration.milliseconds()) finalString += ' ' + colorize('Green', momentDuration.milliseconds().toString()) + 'ms';
    return finalString;
}

function colorize(color, text) {
    const reset = "\x1b[0m";
    const colors = {
        Black: "\x1b[30m",
        Red: "\x1b[31m",
        Green: "\x1b[32m",
        Yellow: "\x1b[33m",
        Blue: "\x1b[34m",
        Magenta: "\x1b[35m",
        Cyan: "\x1b[36m",
        White: "\x1b[37m",
        bgBlack: "\x1b[40m",
        bgRed: "\x1b[41m",
        bgGreen: "\x1b[42m",
        bgYellow: "\x1b[43m",
        bgBlue: "\x1b[44m",
        bgMagenta: "\x1b[45m",
        bgCyan: "\x1b[46m",
        bgWhite: "\x1b[47m"
    };

    return colors[color] + text + reset;
}
