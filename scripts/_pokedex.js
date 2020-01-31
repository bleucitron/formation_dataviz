console.log("Gotta catch'em all !");

const factor = 20;
const bubbleFactor = 100;
let maxHeight;
let maxWeight;
let maxSpeed;

function createByType(pokemons) {
  const pokemonsByType = {};

  pokemons.forEach(pokemon => {
    const type1 = pokemon['Type 1'];
    const type2 = pokemon['Type 2'] !== 'None' ? pokemon['Type 2'] : null;

    if (type1 in pokemonsByType) {
      pokemonsByType[type1].push(pokemon);
    } else {
      pokemonsByType[type1] = [pokemon];
    }

    if (type2) {
      if (type2 in pokemonsByType) {
        pokemonsByType[type2].push(pokemon);
      } else {
        pokemonsByType[type2] = [pokemon];
      }
    }
  });

  return pokemonsByType;
}

function createBar(type, population, total) {
  const li = document.createElement('li');

  li.textContent = type;
  li.classList.add('bar');
  li.style.height = `${(population / total) * 100 * factor}px`;

  return li;
}

function createBarChart(pokemons) {
  const chart = document.createElement('ul');
  chart.classList.add('chart');
  document.body.append(chart);

  const pokemonsByType = createByType(pokemons);
  console.log('BY TYPE', pokemonsByType);

  Object.entries(pokemonsByType).forEach(([type, population]) => {
    const li = createBar(type, population.length, pokemons.length);
    chart.append(li);
  });
}

const max = 100;
const bubbleChartSize = 800;

function createBubble(pokemon) {
  const li = document.createElement('li');

  li.textContent = pokemon.Name;
  li.classList.add('bubble');
  const size = (pokemon.Speed / maxSpeed) * bubbleFactor;
  const height = pokemon['Height (m)'];
  const weight = pokemon['Weight (kg)'];
  li.style.height = `${size}px`;
  li.style.width = `${size}px`;

  li.style.top = `${(height / maxHeight) * bubbleChartSize - size / 2}px`;
  li.style.left = `${(weight / maxWeight) * bubbleChartSize - size / 2}px`;

  return li;
}

function createBubbleChart(pokemons) {
  const bubbles = document.createElement('ul');
  bubbles.classList.add('bubbles');
  document.body.append(bubbles);

  bubbles.style.height = `${bubbleChartSize}px`;
  bubbles.style.width = `${bubbleChartSize}px`;

  maxHeight = Math.max(...pokemons.map(p => p['Height (m)']));
  maxWeight = Math.max(...pokemons.map(p => p['Weight (kg)']));
  maxSpeed = Math.max(...pokemons.map(p => p['Speed']));

  pokemons.map(createBubble).forEach(li => bubbles.append(li));
}

document.addEventListener('DOMContentLoaded', () => {
  fetch(
    'https://raw.githubusercontent.com/iOiurson/formation-dataviz/master/data/pokedex.json',
  )
    .then(resp => resp.json())
    .then(pokemons => {
      console.log('Pokemons', pokemons);

      createBarChart(pokemons);
      createBubbleChart(pokemons);
    });
});
