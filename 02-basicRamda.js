const R = require("ramda");

const getIdFilms = R.pipe(
  R.propOr([], "films"),
  R.map(R.pipe(R.match(/films\/(\d)\//), R.nth(1), Number))
);

module.exports = getIdFilms;
