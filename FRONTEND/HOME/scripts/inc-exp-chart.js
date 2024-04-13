
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
            },
                // {
                //     label: '# of Votes',
                //     data: [2, 9, 13, 15, 25, 23, 0.5, 9, 4, 3, 10, 22, 19, 1],
                //     borderWidth: 2,
                //     lineTension : 0,
                //     backgroundColor : '#af2021',
                // }
            ]
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