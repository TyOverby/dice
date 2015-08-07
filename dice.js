if (this.exports == undefined) {
    window.exports = window;
}


function poll(trials, f) {
    var obj = {};
    for (var i = 0; i < trials; i++) {
        var value = f();
        if (obj[value] == null || obj[value] == undefined) {
            obj[value] = 1;
        } else {
            obj[value] += 1;
        }
    }
    return obj;
}

function percentize(obj) {
    var total = 0;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            total += obj[key];
        }
    }

    var new_obj = {};
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            new_obj[key] = (obj[key] / total) * 100;
        }
    }

    return new_obj;
}

function roll(d) {
    return Math.ceil(Math.random() * d);
}

function roll_n(n, d) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        arr.push(roll(d));
    }
    return arr;
}

function sum(arr) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
        count += arr[i];
    }
    return count;
}

function max_n(n, arr) {
    return arr.sort(function(a, b) { return a - b; }).slice(-n);
}

function min_n(n, arr) {
    return arr.sort(function(a, b) { return a - b; }).slice(0, n);
}

exports.prepare_for_google_charts = function (obj) {
    var arr = [['', 'percent']];
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            arr.push([key, obj[key]]);
        }
    }
    return arr;
}

exports.poll = poll;
exports.percentize = percentize;
exports.roll = roll;
exports.roll_n = roll_n;
exports.sum = sum;
exports.max = function(arr) { return Math.max.apply(null, arr) };
exports.min = function(arr) { return Math.min.apply(null, arr) };
exports.max_n = max_n;
exports.min_n = min_n;
exports.drop_min = function(arr) { return exports.drop_min_n(1, arr); };
exports.drop_max = function(arr) { return exports.drop_max_n(1, arr); };

exports.drop_min_n = function(n, arr) { return exports.max_n(arr.length - n, arr); };
exports.drop_max_n = function(n, arr) { return exports.min_n(arr.length - n, arr); };
