const axios = require("axios");
const R = require("ramda");

const getCharacterFilmsById = async characterId => {
  const characterUrl = `https://swapi.co/api/people/${characterId}`;

  try {
    const characterResponse = await axios.get(characterUrl);

    const films = R.pathOr([], ["data", "films"])(characterResponse);

    const filmsData = await Promise.all(
      R.pipe(
        R.map(axios.get),
        R.map(p => p.then(R.path(["data", "title"])))
      )(films)
    );

    return filmsData;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getCharacterFilmsById;
