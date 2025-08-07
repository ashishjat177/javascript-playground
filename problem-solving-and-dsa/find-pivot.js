// find a pivot in an array such that sum of left element should be equal to right elements

// input -> [1,4,2,5,0]
// output -> 2

// [2, 3, 4, 1, 4, 5]
// output -> 1


const findPivot = (inputArr) => {
    if(!inputArr || !Array.isArray(inputArr) || inputArr.length < 3) {
        return 'invalid'
    }
  
    let left = 0;
    let right = inputArr.length - 1;

    let leftSum = inputArr[left];
    let rightSum = inputArr[right];
    

    while (left < right) {
        if(leftSum < rightSum) {
            left++;
            leftSum += inputArr[left]; 
        } else if(rightSum > leftSum) {
            right--;
            rightSum += inputArr[right]; // 0
        } else {
            if(right - left === 2) {
                 return inputArr[left + 1];
            }
            left++;
            right--;
        }

        console.log('left', left, leftSum)
        console.log('right', right, rightSum)

       
   
        
    }
    return 'no pivot';
}

console.log(findPivot([1,4,2,5,0]))
console.log(findPivot([2, 3, 4, 1, 4, 5]))