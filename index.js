'use strict'

const pokemon = require('./pokemon')
const renderer = require('./renderer');

(async function () {
const rawInputs = process.argv // [node, index.js, arg1]
console.log(rawInputs) // [node, index.js, arg1]
const cleanedInputs = rawInputs.slice(2)
console.log(cleanedInputs) // [arg1]

const pokeId = cleanedInputs[0];

  if (!pokeId) {
    renderer.renderError("Please include pokemon id.");
    return
  }

  try {
    const pokeData = await pokemon.getPoke(pokeId);

    if (!pokeData.success) {
      renderer.renderError(pokeData.error);
      console.log(pokeData.error)
      return;
    }

    const id = pokeData.data.id;
    const name = pokeData.data.name;
    const height = pokeData.data.height;
    const weight = pokeData.data.weight;
    const url = "https://pokeapi.co/api/v2/pokemon/" + name;
    console.log(
      `Pokemon with id: ${id} has name: ${name} and its weight and height are ${weight}, ${height}`
    );
    console.log(`You can download it via ${url}`);

    renderer.renderSuccess(`${name}, ${height}`, `${weight}`);
  } catch (error) {
    renderer.renderError(error.message);
    console.log(error)
    return
  }
})();

