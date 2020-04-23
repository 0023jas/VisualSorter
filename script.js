//Buttons
bubbleSortButton = document.getElementById("bubbleSortButton")
selectionSortButton = document.getElementById("selectionSortButton")
mergeSortButton = document.getElementById("mergeSortButton")
randomListButton = document.getElementById("randomListButton")
insertEntityButton = document.getElementById("insertEntityButton")

//Input Boxes
numInput = document.getElementById("numInput")
numAddition = document.getElementById("numAddition")

maxListLength = getInputValue(numInput)
numberList = []
function generateList(Length, List){
    while (List.length != Length){  
        randGenNumber = Math.floor(Math.random()*maxListLength+1)
        List.push(randGenNumber)
    }
}
generateList(maxListLength, numberList)

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    legend: false,
    data: {
        labels: numberList,
        datasets: [{
            label: 'Value',
            data: numberList,
            backgroundColor: '#E0FFFF',
            borderColor: '#8ecaf3',
            borderWidth: 1
        }]
    },
    options: {
        legend: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

async function bubbleSort(arrayToSort){
    hideButtons()
    checkStatus = checkList()
    while (checkStatus == false){
        falseCounter = 0
        for (i = 0; i < arrayToSort.length; i++){
            x = i+1
            if(arrayToSort[i] > arrayToSort[x]){
                storedFirstValue = arrayToSort[i]
                arrayToSort[i] = arrayToSort[x]
                arrayToSort[x] = storedFirstValue
                falseCounter += 1
            }  
        }
        updateData(myChart, numberList)
        await sleep(200)
        if(falseCounter == 0){
            checkStatus = true
        }
    }
    showButtons()
}

async function selectionSort(arrayToSort){
    hideButtons()
    checkStatus = checkList()
    y = 0
    while (checkStatus == false){
        greatestNumber = 0
        greatestNumberPosition = 0
        for (i = y; i < arrayToSort.length; i++){
            if (greatestNumber <= arrayToSort[i]){
                greatestNumber = arrayToSort[i]
                greatestNumberPosition = i
            }
        }
        y += 1
        arrayToSort.splice(greatestNumberPosition, 1)
        arrayToSort.unshift(greatestNumber)
        updateData(myChart, arrayToSort)
        await sleep(200)
        if(y == arrayToSort.length){
            checkStatus = true
        }
    }
    showButtons()
}

async function mergeSort() {
    arr = myChart.data.datasets[0].data
    if(checkList() == false){
        sorted = arr.slice()
        n = sorted.length
        buffer = new Array(n);
        timerMultiplier = 0
        hideButtons()
        for (var size = 1; size < n; size *= 2) {
            timerMultiplier++
            for (var leftStart = 0; leftStart < n; leftStart += 2*size) {
                var left = leftStart,
                right = Math.min(left + size, n),
                leftLimit = right,
                rightLimit = Math.min(right + size, n),
                i = left;
                while (left < leftLimit && right < rightLimit) {
                    if (sorted[left] <= sorted[right]) {
                        buffer[i++] = sorted[left++];
                    } else {
                        buffer[i++] = sorted[right++];
                    }
                }
                while (left < leftLimit) {
                    buffer[i++] = sorted[left++];
                    await sleep(20*timerMultiplier)
                    updateData(myChart, sorted)
                }
                while (right < rightLimit) {
                    buffer[i++] = sorted[right++];
                    await sleep(20*timerMultiplier)
                    updateData(myChart, sorted)
                }
            }
            var temp = sorted,
            sorted = buffer,
            buffer = temp;
        }
        await sleep(200)
        updateData(myChart, sorted)
        showButtons()
    }
}

function randomizeList(Length, List){
    if(Number.isInteger(getInputValue(numInput)) == true && getInputValue(numInput) > 0){
        Length = getInputValue(numInput)
        List.length = 0
        while (List.length != Length){  
            randGenNumber = Math.floor(Math.random()*maxListLength+1)
            List.push(randGenNumber)
        }
        updateData(myChart, List)
    }else{
        alert("Please Enter Positive Integer Value")
    }
}

function insertEntity(){
    List = myChart.data.datasets[0].data
    var insertValue = getInputValue(numAddition)
    if(Number.isInteger(insertValue) == true){
        List.push(insertValue)
        updateData(myChart, List)
    }else{
        alert("Please Enter Integer Value")
    }
}

function getInputValue(inputBox){
    var inputValue = inputBox.value;
    var inputValueNum = parseInt(inputValue);
    return inputValueNum
}

function updateData(chart, chartData){
    x = chartData
    chart.data.datasets[0].data = x;
    chart.data.labels = x;
    chart.update();
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function hideButtons(){
    randomListButton.style.visibility = 'hidden';
    bubbleSortButton.style.visibility = 'hidden';
    selectionSortButton.style.visibility = 'hidden';
    mergeSortButton.style.visibility = 'hidden';
    insertEntityButton.style.visibility = 'hidden';
    numInput.style.visibility = 'hidden';
    numAddition.style.visibility = 'hidden';
}

function showButtons(){
    randomListButton.style.visibility = 'visible';
    bubbleSortButton.style.visibility = 'visible';
    selectionSortButton.style.visibility = 'visible';
    mergeSortButton.style.visibility = 'visible';
    insertEntityButton.style.visibility = 'visible';
    numInput.style.visibility = 'visible';
    numAddition.style.visibility = 'visible';
}

function checkList(){
    arrayToCheck = myChart.data.datasets[0].data
    pairsChecked = 0
    for(i = 0; i < arrayToCheck.length; i++){
        if(arrayToCheck[i] <= arrayToCheck[i+1]){
            pairsChecked +=1
        }
    }
    if(pairsChecked == arrayToCheck.length-1){
        return true
    }
    else if(pairsChecked != arrayToCheck.length-1){
        return false
    }
}
