module.exports.error = (req, res) => {
  res.status(404).send({ message: 'Страницы не существует' });
};
