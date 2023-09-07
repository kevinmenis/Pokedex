import { test, expect } from "@playwright/test";
import { POKE_IMG } from "../src/api/endpoint.js";
const LOCALHOST_URL = "http://localhost:5173/";

test("Has header with select order, select type and input search pokemon", async ({
  page,
}) => {
  await page.goto(LOCALHOST_URL);

  const selectOrder = await page.$("#selectOrder");
  const selectType = await page.$("#selectType");
  const searchPokemon = await page.$("#searchPokemon");

  await expect(page).toHaveTitle(/Pokedex/);
  await expect(selectOrder).toBeTruthy;
  await expect(selectType).toBeTruthy;
  await expect(searchPokemon).toBeTruthy;
});

test("The first pokemon to render is Bulbasaur", async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  await page.waitForSelector(".pokemon-card");

  const imagePokemon = await page.$(".pokemon-card img");
  const namePokemon = await page.$(".pokemon-card h3");
  const idPokemon = await page.$(".pokemon-card span");

  const imageSrc = await imagePokemon.getAttribute("src");
  const textContentNamePokemon = await namePokemon.textContent();
  const textContentIdPokemon = await idPokemon.textContent();

  await expect(textContentNamePokemon).toBe("Bulbasaur");
  await expect(textContentIdPokemon).toBe("N.° 1");
  /* await expect(imageSrc?.startsWith(POKE_IMG)).toBeTruthy; */
  await expect(imageSrc).toBe(POKE_IMG + "001.png");
});

test("Render all pokemon", async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  await page.waitForSelector(".pokemon-card", { timeout: 20000 })

  const pokemonCards = await page.$$(".pokemon-card");

  await expect(pokemonCards.length).toBe(1010);
});
