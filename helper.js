const helper = {}

helper.random = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

helper.isNumeric = (str) => {
    return /^-?\d+$/.test(str);
}

module.exports = helper;