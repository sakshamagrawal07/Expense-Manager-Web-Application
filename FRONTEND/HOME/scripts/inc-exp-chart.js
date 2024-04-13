
function Chartfun(arr) {

    Chart.defaults.color = "#fff"

    const ctx = document.querySelector('#inc-exp-chart')
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
            datasets: [{
                label: '# of Votes',
                data: arr,
                borderWidth: 2,
                lineTension: 0,
                backgroundColor: 'green',
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
        },
    })
}

module.exports = Chartfun