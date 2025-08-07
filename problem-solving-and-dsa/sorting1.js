/**  1. selection sort 
 *          
 *          select one item, assume it as a smallest number in the array, check and swap the minimum with the first element.
 *      
 *        min -> 9 (swap with first)       min -> 13                   min -> 20                   min -> 24                    min -> 46
 *          [13, 46, 24, 52, 20, 9] -> [9, 46, 24, 52, 20, 13] -> [9, 13, 24, 52, 20, 46] -> [9, 13, 20, 52, 24, 46] -> [9, 13, 20, 24, 52, 46] -> [9, 13, 20, 24, 46, 52]
 *                 
*/


// (no need to check last element (n-1))
function selectionSort(arr)  {
    for(let i = 0; i < arr.length - 1; i++) {
        let min = i; 
        for(let j = i; j < arr.length; j ++) {
            if(arr[j] < arr[min]) {
                min = j
            } 
        }
        if(min !== i) {
            console.log(arr, '-->');

            [arr[i], arr[min]] = [arr[min], arr[i]]
        }
    }
    console.log(arr);
}

const unsortedArr = [13, 46, 24, 52, 20, 9];
// selectionSort(unsortedArr)


/** 2. Bubble sort
 *  take first two -> compare and swap -> repeat untill all are swapped. 
 *          
 *        compare -> (13, 46)         (46 -> 24)                  (46 -> 52)              (52 -> 20)                   (2 -> 9)
 *  (0 -> n - 1)  [13, 46, 24, 52, 20, 9] -> [13, 46, 24, 52, 20, 9] -> [13, 24, 46, 52, 20, 9] -> [13, 24, 46, 52, 20, 9] -> [13, 24, 46, 52, 20, 9] -> [13, 24, 46, 52, 9, 20]
 *      
 *                         (13 - 46)
 *   (0 -> n - 2)    [13, 24, 46, 52, 9, 20]  -> [13, 24, 46, 9, 52, 20] -> [13, 24, 46, 9, 20, 52 ]
 *     
 * 
 *    (0 -> n -3) 
 *    (0 -> n -4)   ....... (0 , 1)  
 */


function bubbleSort(arr) {
    for(let i = arr.length - 1; i >= 0; i--) {
        let swapped = false;
        for(let j = 0; j <= i - 1; j++) {
            if(arr[j+ 1] < arr[j]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
                console.log(arr)

                swapped = true;
            }
        }
        if(!swapped) {
            break;       
        }
    }
    console.log('final', arr);
}

// bubbleSort(unsortedArr);



/**
 *  3. Insertion sort
 *    
 *    pick (i + 1)th element and check it with it's previous elements if it is smaller then shift it to it's right position.
 *      
 *        (46)   i = 0              check 24 with previous         check 52                       check 9               all sorted
 *     [13, 46, 24, 52, 20, 9] -> [13, 46, 24, 52, 20, 9] ->  [13, 24, 46, 52, 20, 9] -> [13,20, 24, 46, 52, 9] -> [9, 13,20, 24, 46, 52]
 *  
 * first loop -> 0 -> n; 
 * second loop i + 1 --> 0
 */


function insertionSort(arr) {
    for(let i = 0; i < arr.length - 1; i++) {
        let j = i + 1;
        while(j > 0 && arr[j] < arr[j - 1]) {
            [arr[j], arr[j-1]] = [arr[j - 1], arr[j]];
            j--;
            console.log(arr)
        }
    }
}

insertionSort(unsortedArr);
