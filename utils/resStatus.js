const ResStatus = {
  OK: {
    CODE: 200,
    RESPONSE: { message: 'Запрос успешно выполнен' },
    DEL_CARD_RESPONSE: { message: 'Карточка удалена' },
    LIKE_CARD_RESPONSE: { message: 'Лайк добавлен' },
    DISLIKE_CARD_RESPONSE: { message: 'Лайк удален' },
    AUTH_RESPONSE: { message: 'Авторизация прошла успешно!' },
  },
  CREATED: {
    CODE: 201,
    RESPONSE: { message: 'Объект успешно создан' },
  },
  INVALID_DATA: {
    CODE: 400,
    RESPONSE: { message: 'Данные введены некорректно' },
  },
  UNAUTHORIZED: {
    CODE: 401,
    RESPONSE: { message: 'Неправильные почта или пароль' },
  },
  NOT_FOUND: {
    CODE: 404,
    USER_RESPONSE: { message: 'Пользователь с таким именем не найден' },
    CARD_RESPONSE: { message: 'Карточка не найдена' },
    PAGE_RESPONSE: { message: 'Страницы не существует' },
  },
  CONFLICT: {
    CODE: 409,
    EMAIL_RESPONSE: { message: 'Пользователь с таким email уже существует' },
  },
  INTERNAL: {
    CODE: 500,
    RESPONSE: { message: 'Произошла ошибка' },
  },
};

module.exports = ResStatus;
