const Chart = require('chart.js/src/chart.js')

document.addEventListener('DOMContentLoaded', () => {
  var ctx = document.getElementById('poke-chart').getContext('2d')
var scatterChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Scatter Dataset',
            backgroundColor: "url('/img/charmander.png')",
            data: [{
                x: -10,
                y: 0,
            }, {
                x: 0,
                y: 10
            }, {
                x: 10,
                y: 5
            }]
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        },
        showLines: false,
    }
});
})