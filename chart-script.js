var numTracks = 200
const ctx = document.getElementById('ioChart').getContext('2d');
const ioChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Sorted Array',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Index'
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Value'
                },
                suggestedMin: 0,
                max: 99
            }
        }
    }
});