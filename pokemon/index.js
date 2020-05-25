"use strict";

const fetch = require("node-fetch");
const terminalImage = require("terminal-image");
const jimp = require("jimp");

/*
const POKEMON_API_KEY = "your API Key";
//const pokemonAPIKey = require("../config").POKEMON_API_KEY; //myself
const pokemonAPIKey = POKEMON_API_KEY;
/** 
 * @typedef Pokemon
 *
 * @property {string} pokemon.id
 * @property {string} pokemon.name
 *
 *
 * @property {img} image
 * 
 * @property {string} pokemon.weight
 * @property {string} pokemon.height
 * @property {string} pokemon.base_experience
 */

/**
 * @ param {string} id
 * @ returns {Promise<Pokemon>}
*/



async function getPoke(id) {
  try {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const jsoned = await response.json();
  if (jsoned.error) {
    if (jsoned.error.code === 1006) {
      return {
        success: false,
        error: `Pokemon with id ${id} not found, please check input.`,
      };
    }

    return {
      success: false,
      error: jsoned.error.message,
    };
  }
//   const imageResponse = await fetch(jsoned.sprites.front_default)
//   const imageData = await imageResponse.buffer()

//   const jimpImage = await jimp.read(imageData)
//   const resizedImage = await jimpImage.resize(200, 200)
//     .quality(100)
//     .getBufferAsync(jimp.PNG_FILTER_AUTO)

//  const image = await terminalImage.buffer(resizedImage)
  return {
    success: true,
    data: {
      id: jsoned.id,
      name: jsoned.name,
      height: jsoned.height,
      weight: jsoned.weight,
      base_experience: jsoned.base_experience,
    },
  };
}catch(err){
  console.log(err)
}
}
// /**
//  * @param {string} url
//  * @returns {Promise<string>}
//  */
// async function getImage(url) {
//   try {
//   const imageResponse = await fetch(url)
//   const imageData = await imageResponse.buffer()

//   const jimpImage = await jimp.read(imageData)
//   const resizedImage = await jimpImage.resize(200, 200)
//       .quality(100)
//       .getBufferAsync(jimp.JPEG)

//   return await terminalImage.buffer(resizedImage)
//   }catch(err){
//     console.log(err)
//   }
// }

module.exports = {
    getPoke,
  };
