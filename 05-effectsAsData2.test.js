const axios = require("axios");
const { genTester, yields } = require("gen-tester");
const { call, all } = require("cofx");
const getCharacterFilmsById = require("./05-effectsAsData2");

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
  const respValue = { resp: "value", json: "hi" };
  const returnValue = { data: "value", extra: "stuff" };

  const tester = genTester(getCharacterFilmsById, 1);

  const { actual, expected } = tester(
    yields(call(axios.get, "https://swapi.co/api/people/1"), {
      data: character
    }),

    yields(
      all([
        call(axios.get, "https://swapi.co/api/films/2/"),
        call(axios.get, "https://swapi.co/api/films/6/"),
        call(axios.get, "https://swapi.co/api/films/3/"),
        call(axios.get, "https://swapi.co/api/films/1/"),
        call(axios.get, "https://swapi.co/api/films/7/")
      ]),
      films.map(film => ({ data: film }))
    ),

    [
      "The Empire Strikes Back",
      "Revenge of the Sith",
      "Return of the Jedi",
      "A New Hope",
      "The Force Awakens"
    ]
  );

  expect(actual).toEqual(expected);
});
