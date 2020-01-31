document.addEventListener('DOMContentLoaded', () => {
  var populationCtx = document.getElementById('myPopulation');
  var bubblesCtx = document.getElementById('myBubbles');

  populationCtx.getContext('2d').canvas.height = 400;
  populationCtx.getContext('2d').canvas.width = 700;
  // bubblesCtx.height = 400;
  // bubblesCtx.width = 700;

  fetch(
    'https://raw.githubusercontent.com/iOiurson/formation-dataviz/master/data/population.json',
  )
    .then(resp => resp.json())
    .then(populations => {
      const labels = populations.map(p => p.name);
      const values = populations.map(p => p.population);

      new Chart(populationCtx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Population',
              data: values,
            },
          ],
        },
      });
    });

  fetch(
    'https://raw.githubusercontent.com/iOiurson/formation-dataviz/master/data/pokedex.json',
  )
    .then(resp => resp.json())
    .then(pokemons => {
      const data = pokemons.map(p => ({
        x: p['Weight (kg)'],
        y: p['Height (m)'],
        r: p['Speed'],
      }));

      new Chart(bubblesCtx, {
        type: 'bubble',
        data: {
          datasets: [
            {
              data: data,
            },
          ],
        },
      });
    });
});
