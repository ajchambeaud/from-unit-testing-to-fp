const { task, call, all } = require("cofx");
const axios = require("axios");
const R = require("ramda");

function* getCharacterFilmsById(characterId) {
  const characterUrl = `https://swapi.co/api/people/${characterId}`;

  const characterResponse = yield call(axios.get, characterUrl);

  const films = R.pathOr([], ["data", "films"])(characterResponse);

  const filmsData = yield all(R.map(item => call(axios.get, item), films));

  return R.map(R.path(["data", "title"]), filmsData);
}

/*
task(getCharacterFilmsById, 1)
  .then(console.log)
  .catch(console.error);
*/

module.exports = getCharacterFilmsById;
