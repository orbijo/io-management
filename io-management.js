const head = parseInt(prompt("Initial head position: "))
const sequence = prompt("Enter request sequence (separated by spaces): ").split(" ").map(Number);

const numTracks = 200;

// display sorted array and total seek time
// just change the function depending on the algorithm to use
var ioArray = clook(head, sequence)

console.log(ioArray)
console.log(totalSeekTime(ioArray))

// IO functions returns a sorted array
function fcfs(head, sequence) {
    return [head, ...sequence];
}

function sstf(head, sequence) {
    var arr = []

    var curNum = head;
    arr.push(curNum)

    while(sequence.length != 0){
        curNum = sequence.splice(findIndexOfSST(curNum, sequence), 1)[0]
        arr.push(curNum)
    }

    return arr
}

function scan(head, sequence) {
    const sortedArr = [head, ...sequence]
    sortedArr.push(numTracks-1)
    sortedArr.sort((a, b) => a - b)
    const upperHalf = sortedArr.slice(sortedArr.indexOf(head))
    const lowerHalf = sortedArr.slice(0, sortedArr.indexOf(head))
    lowerHalf.sort((a, b) => b - a)
    return upperHalf.concat(lowerHalf)
}

function cscan(head, sequence) {
    const sortedArr = [head, ...sequence]
    sortedArr.push(numTracks-1)
    sortedArr.push(0)
    sortedArr.sort((a, b) => a - b)
    const upperHalf = sortedArr.slice(sortedArr.indexOf(head))
    const lowerHalf = sortedArr.slice(0, sortedArr.indexOf(head))
    return upperHalf.concat(lowerHalf)
}

function look(head, sequence){
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
        if(sst != -1){
            if(Math.abs(element - current) < Math.abs(sst - current)){
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