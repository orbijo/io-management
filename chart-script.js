var numTracks = 200
const ctx = document.getElementById('ioChart').getContext('2d');
const length = document.getElementById("sequence").value.split(" ").map(Number).length;
const chartLabel = document.getElementById("algo").value.toUpperCase()
const ioChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: chartLabel,
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    plugins: [ChartDataLabels],
    options: {
        plugins: {
            // Change options for ALL labels of THIS CHART
            datalabels: {
                color: '#FF0000',
                anchor: 'end',
                align: 'top',
                labels: {
                    title: {
                        font: {
                            weight: 'bold'
                        }
                    },
                    value: {
                        color: 'green'
                    }
                }

            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'PT'
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Track Number'
                },
                suggestedMin: 0,
                max: 99,
            },
        }
    }
});