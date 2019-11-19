const getIdFilms = require("./02-basicRamda");

const data = {
  name: "Luke Skywalker",
  films: [
    "https://swapi.co/api/films/2/",
    "https://swapi.co/api/films/6/",
    "https://swapi.co/api/films/3/",
    "https://swapi.co/api/films/1/",
    "https://swapi.co/api/films/7/"
  ],
  url: "https://swapi.co/api/people/1/"
};

test("should return an array of films id", () => {
  const expected = [2, 6, 3, 1, 7];

  expect(getIdFilms(data)).toEqual(expected);
});

test("should work without films", () => {
  const expected = [];

  expect(getIdFilms({})).toEqual(expected);
});

test("should work with empty films", () => {
  const expected = [];

  expect(getIdFilms({ films: [] })).toEqual(expected);
});
