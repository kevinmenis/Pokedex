## Pokédex

- En esta pokedex vas a encontrar funciones como:

- Un buscador en tiempo real.
- Poder buscar por nombre o id del pokémon.
- Filtros de búsquedas por tipo y generación.
- Poder ordenar:
  Alfabeticamente ascendente o descendente.
  Numericamente ascendente o descendente.
- Información del pokémon seleccionado.

- Para ejecutarlo la App, en la terminal: npm run dev

- Agregue un test, use Playwright para hacerlo: https://playwright.dev/
- Tiene 3 test:
  (1) Para verificar si retorno bien el header con el titulo pokedex, los selects y el buscador
  (2) Para verificar en el main el primer card pokémon sea Bulbasaur
  (3) Para verificar en el main si retorno todos los pokémon, son 1010
- Para probar el test en la terminal: npx playwright test
