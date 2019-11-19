const axios = require("axios");
const { call, all } = require("cofx");
const getCharacterFilmsById = require("./04-effectsAsData");

const character = {
  films: [
    "https://swapi.co/api/films/2/",
    "https://swapi.co/api/films/6/",
    "https://swapi.co/api/films/3/",
    "https://swapi.co/api/films/1/",
    "https://swapi.co/api/films/7/"
  ]
};

const films = [
  { title: "The Empire Strikes Back", url: "https://swapi.co/api/films/2/" },
  { title: "Revenge of the Sith", url: "https://swapi.co/api/films/6/" },
  { title: "Return of the Jedi", url: "https://swapi.co/api/films/3/" },
  { title: "A New Hope", url: "https://swapi.co/api/films/1/" },
  { title: "The Force Awakens", url: "https://swapi.co/api/films/7/" }
];

test("should resolve with an array of film titles", () => {
  const gen = getCharacterFilmsById(1);

  expect(gen.next()).toEqual({
    done: false,
    value: call(axios.get, "https://swapi.co/api/people/1")
  });

  const resCharacter = { data: character };

  expect(gen.next(resCharacter)).toEqual({
    done: false,
    value: all([
      call(axios.get, "https://swapi.co/api/films/2/"),
      call(axios.get, "https://swapi.co/api/films/6/"),
      call(axios.get, "https://swapi.co/api/films/3/"),
      call(axios.get, "https://swapi.co/api/films/1/"),
      call(axios.get, "https://swapi.co/api/films/7/")
    ])
  });

  const resFilms = films.map(film => ({ data: film }));

  expect(gen.next(resFilms)).toEqual({
    done: true,
    value: [
      "The Empire Strikes Back",
      "Revenge of the Sith",
      "Return of the Jedi",
      "A New Hope",
      "The Force Awakens"
    ]
  });
});
