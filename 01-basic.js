const getIdFilms = data => {
  const films = data.films || [];

  return films.map(filmUrl => +filmUrl.match(/films\/(\d)\//)[1]);
};

module.exports = getIdFilms;
