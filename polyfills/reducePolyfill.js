const arr = [1,2,3, 4, 5, 6, 7, 8]

const data = arr.reduce((acc, next) => {
    return acc + next
});


Array.prototype.myReduce = function() {
    
}

console.log(data)