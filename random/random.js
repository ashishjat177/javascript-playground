//How would you create a function to convert a nested list of integers into a flat list, and can you make an asynchronous version of this function using async/await?

const nestedList = [1, 2, [3, 4, [5, 6]]]

function getFlatList(list) {
    const updatedList = [];
    list.forEach(item => {
        Array.isArray(item) ? updatedList.push(...getFlatList(item)) : updatedList.push(item);
    });

    return updatedList
}

console.log(getFlatList(nestedList))


// How would you determine the common elements between two sorted arrays in JavaScript?

const arr1 = [1, 2, 3, 4, 5, 6]
const arr2 = [1, 3, 5, 8]

// two pointer approach

function getCommonElements() {
    let i = 0;
    let j = 0;
    const result = [];
    
    while(i < arr1.length || j < arr2.length) {
        if(arr1[i] === arr2[j]) {
            result.push(arr1[i])
            i++;
            j++
        } else if(arr1[i] < arr2[j]) {
            i++
        } else {
            j++
        }
    }
}
