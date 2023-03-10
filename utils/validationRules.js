/* eslint-disable no-useless-escape */

// регулярное выражение для валижации URL
module.exports.urlValid = (v) => /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?/gi.test(v);
