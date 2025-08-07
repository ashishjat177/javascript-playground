// 1. pallindrom
    // Q. 121 -> true 

    const checkPallindrom = (num) => {
     if(!num || num < 0) {
        return false;
     }
     const validStr = /[a-zA-Z0-9]/;
     const newStr = String(num);

      let left = 0;
      let right = newStr.length - 1;
       while(right > left) {
        if(!validStr.test(newStr[left])) {
            left++
        } 
        if(!validStr.test(newStr[right])) {
            right--
        }
        if(newStr[left] === newStr[right]) {
            left++;
            right--;
        } else {
            return false;
        }
      
       }
       return true;
    }

    console.log(checkPallindrom('121'))