console.log('Good luck space cowboy !');

const factor = 20;
let total = 0;

function createBar({ name, population }) {
  const li = document.createElement('li');

  li.textContent = name;
  li.classList.add('bar');
  li.style.height = `${(population / total) * 100 * factor}px`;

  return li;
}

function calculateTotal(data) {
  return data
    .map(({ population }) => population)
    .reduce((acc, current) => acc + current, 0);
}

document.addEventListener('DOMContentLoaded', () => {
  fetch(
    'https://raw.githubusercontent.com/iOiurson/formation-dataviz/master/data/population.json',
  )
    .then(resp => resp.json())
    .then(data => {
      console.log('DATA', data);

      const chart = document.createElement('ul');
      chart.classList.add('chart');
      document.body.append(chart);

      total = calculateTotal(data);

      data.map(createBar).forEach(bar => chart.append(bar));
    });
});
