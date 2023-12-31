// chart-script.js must be included first
var ioArray
var seekTime

// main function
function calculate(event) {
    event.preventDefault()

    const head = parseInt(document.getElementById("head").value)
    const sequence = document.getElementById("sequence").value.split(" ").map(Number);
    numTracks = parseInt(document.getElementById("numTracks").value)
    const selectedAlgo = document.getElementById("algo").value

    switch(selectedAlgo){
        case 'fcfs':
            ioArray = fcfs(head, sequence)
            break;
        case 'sstf':
            ioArray = sstf(head, sequence)
            break;
        case 'scan':
            ioArray = scan(head, sequence)
            break
        case 'cscan':
            ioArray = cscan(head, sequence)
            break;
        case 'look':
            ioArray = look(head, sequence)
            break;
        case 'clook':
            ioArray = clook(head, sequence)
            break;
    }

    seekTime = totalSeekTime(ioArray);

    updateChart()
}

// IO functions returns a sorted array
function fcfs(head, sequence) {
    return [head, ...sequence];
}

function sstf(head, sequence) {
    var arr = []

    var curNum = head;
    arr.push(curNum)

    while (sequence.length != 0) {
        curNum = sequence.splice(findIndexOfSST(curNum, sequence), 1)[0]
        arr.push(curNum)
    }

    return arr
}

function scan(head, sequence) {
    const sortedArr = [head, ...sequence]
    sortedArr.push(numTracks - 1)
    sortedArr.sort((a, b) => a - b)
    const upperHalf = sortedArr.slice(sortedArr.indexOf(head))
    const lowerHalf = sortedArr.slice(0, sortedArr.indexOf(head))
    lowerHalf.sort((a, b) => b - a)
    return upperHalf.concat(lowerHalf)
}

function cscan(head, sequence) {
    const sortedArr = [head, ...sequence]
    sortedArr.push(numTracks - 1)
    sortedArr.push(0)
    sortedArr.sort((a, b) => a - b)
    const upperHalf = sortedArr.slice(sortedArr.indexOf(head))
    const lowerHalf = sortedArr.slice(0, sortedArr.indexOf(head))
    return upperHalf.concat(lowerHalf)
}

function look(head, sequence) {
    const sortedArr = [head, ...sequence]
    sortedArr.sort((a, b) => a - b)
    const upperHalf = sortedArr.slice(sortedArr.indexOf(head))
    const lowerHalf = sortedArr.slice(0, sortedArr.indexOf(head))
    lowerHalf.sort((a, b) => b - a)
    return upperHalf.concat(lowerHalf)
}

function clook(head, sequence) {
    const sortedArr = [head, ...sequence]
    sortedArr.sort((a, b) => a - b)
    const upperHalf = sortedArr.slice(sortedArr.indexOf(head))
    const lowerHalf = sortedArr.slice(0, sortedArr.indexOf(head))
    return upperHalf.concat(lowerHalf)
}

// helper functions
function findIndexOfSST(current, sequence) {
    var sst = -1;
    sequence.forEach(element => {
        if (sst != -1) {
            if (Math.abs(element - current) < Math.abs(sst - current)) {
                sst = element
            }
        } else {
            sst = element
        }
    })
    return sequence.indexOf(sst)
}

function totalSeekTime(arr) {
    let total = 0;

    for (let i = 1; i < arr.length; i++) {
        total += Math.abs(arr[i] - arr[i - 1]);
    }

    return total
}

function updateChart() {
    const ctx = document.getElementById('ioChart').getContext('2d');
    let label = document.getElementById("algo").value.toUpperCase()
    ioChart.data.labels = ioArray.map((_, index) => index.toString());
    ioChart.data.datasets[0].data = ioArray;
    ioChart.options.scales.y.max = numTracks-1
    ioChart.data.datasets[0].label = label
    ioChart.update();

    // Display total seek time on the chart
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.textAlign = 'right';
    ctx.fillText('Total Seek Time: ' + seekTime, ctx.canvas.width - 10, 20);

    document.getElementById("totalSeekTime").innerText = seekTime
}