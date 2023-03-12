/* eslint-disable no-useless-escape */

// регулярное выражение для валидации URL
const urlValid = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?/gi;

module.exports = {
  urlValid,
};
