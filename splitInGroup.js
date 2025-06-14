// split array into smaller sub arrays by given length

const result1 = splitIntoGroups([1,2,3,4,5], 2)  // => [[1,2], [3,4], [5]]
const result2 = splitIntoGroups([1,2,3,4,5], 3) // =>  [[1,2,3], [4,5]]
const result3 =  splitIntoGroups(['a', 'b', 'c', 'd']); // => [['a'], ['b'], ['c'], ['d']]

console.log(...result1);
console.log(...result2);
console.log(...result3);

function splitIntoGroups1(arr,  n = 1) {
    if(!Array.isArray(arr) || n < 1) {
        return [];
    }
    let count = 0;
    let result = [];
    for(let item of arr) {
        const end = count + n > arr.length ? arr.length : count + n;
        const subArr = arr.slice(count, end);
        count = end;
        result.push(subArr);
        if(count >= arr.length) {
             return result;
        }
    };
    return result;
}



function splitIntoGroups2(arr,  n = 1) {
    if(!Array.isArray(arr) || n < 1) {
        return [];
    }
    let subArr = [];
    let result = [];
    for(let i = 0; i<arr.length; i++) {
        subArr.push(arr[i]);

        if(subArr.length === n || i === arr.length - 1) {
            result.push(subArr);
            subArr = [];
        }
    };
    return result;
}

function splitIntoGroups(arr,  n = 1) {
    if(!Array.isArray(arr) || n < 1) {
        return [];
    }
    let subArr = [];
    let result = [];
    for(let i = 0; i< arr.length; i += n) {
        subArr = arr.slice(i, i + n);
        result.push(subArr)
    };
    return result;
}


