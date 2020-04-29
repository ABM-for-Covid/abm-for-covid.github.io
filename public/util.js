function convertToFormatV1(jsonVal) {
    for (let i in jsonVal) {
        if (!(i in graphDataFromDB)) {
            graphDataFromDB[i] = []
        }
        graphDataFromDB[i][parseInt(jsonVal['day'])] = [parseInt(jsonVal['day']), parseFloat(jsonVal[i])]
    }
    console.log('graphData', graphDataFromDB)
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}