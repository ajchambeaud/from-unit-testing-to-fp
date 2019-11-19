const axios = require("axios");
const getCharacterFilmsById = require("./03-effects");

jest.mock("axios");

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

test("should call the right url to get the character data and the films", () => {
  const characterId = 1;
  const url = `https://swapi.co/api/people/${characterId}`;
  axios.get.mockResolvedValue({ data: character });

  return getCharacterFilmsById(1).then(() => {
    expect(axios.get).toHaveBeenNthCalledWith(1, url);
    expect(axios.get).toHaveBeenNthCalledWith(2, films[0].url);
    expect(axios.get).toHaveBeenNthCalledWith(3, films[1].url);
    expect(axios.get).toHaveBeenNthCalledWith(4, films[2].url);
    expect(axios.get).toHaveBeenNthCalledWith(5, films[3].url);
    expect(axios.get).toHaveBeenNthCalledWith(6, films[4].url);
  });
});

test("should resolve with an array of film titles", () => {
  const characterId = 1;
  const url = `https://swapi.co/api/people/${characterId}`;

  axios.get.mockImplementation(url => {
    const data = url.match("people")
      ? character
      : films.find(item => item.url === url);

    return Promise.resolve({
      data
    });
  });

  return getCharacterFilmsById(1).then(result => {
    expect(result).toEqual(films.map(film => film.title));
  });
});
