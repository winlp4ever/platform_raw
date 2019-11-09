function compare2Arrays(arr1, arr2) {
    if (arr1.length != arr2.length) {
        return false;
    } 
    for (let i in arr1) {
        if (JSON.stringify(arr1[i]) != JSON.stringify(arr2[i])) return false;
    }
    return true;
}

module.exports = {compare2Arrays};