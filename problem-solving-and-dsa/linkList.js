class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkList {
    constructor() {
        this.head = null;
    }

    addNodeAtFirst(data) {
        const newNode = new Node(data);
        if(!this.head) {
            this.head = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
    }

    addAtLast(data) {
        const newNode = new Node(data);

        if(!this.head) {
            this.head = newNode;
        } else {
            let temp = this.head;
            while(temp.next !== null) {
                temp = temp.next;
            }
            temp.next = newNode;
        }
    }

    // 6 -> 5-> 8 -> 10 -> 11

    addAtPosition(data, position) {
        const newNode = new Node(data);
        
        if(position === 0) {
            this.addNodeAtFirst(data);
            return;
        }
        
        let temp = this.head;
        let count = 1;

        while(temp !== null && count < position) {
            count += 1;
            temp = temp.next;
        }

        if (temp === null) {
            console.log("Position out of bounds");
            return;
        }

        newNode.next = temp.next;
        temp.next = newNode;
    }

    // remove -> 

    removeFromFirst() {
        let temp = this.head;
        this.head = temp.next;
    }

    removeFromLast() {
        let temp = this.head;

        // if list is empty
        if(!this.head) {
            console.log('list is empty');
            return;
        }
        // if list has only one node
        if(this.head.next === null) {
            this.head = null;
        }

        while(temp.next.next !== null) {
            temp = temp.next;
        }
        temp.next = null;
    }

    getLength() {
        let temp = this.head;
        let count = 0;
        while(temp !== null) {
            count++;
            temp = temp.next;
        }
        return count;
    }
   
     // 6 -> 5->     8    -> 10 -> 11
    removeFromPosition(index) {
        if(!this.head) {
            console.log('list is empty');
            return;
        }

        if(index === 0) {
            this.removeFromFirst();
            return;
        }

        if(index >= this.getLength()) {
            console.log('index is bigger then ll');
            return;
        }

        let temp = this.head;
        let count = 1;

        while(count < index) {
            count++;
            temp = temp.next;
        }
        if (temp.next) {
            temp.next = temp.next.next;
        }    
    }

    printNode() {
      let temp = this.head;
      let result = []
      while(temp !== null) {
        result.push(temp.data);
        temp = temp.next;
      }
      console.log(result.join('->'));
    }
}


const ll = new LinkList();

ll.addNodeAtFirst(3);
ll.addAtLast(5)
ll.addAtLast(7)
ll.addNodeAtFirst(2)
ll.addAtPosition(4,2);
ll.printNode();

// ll.removeFromFirst()
// ll.removeFromLast()
ll.removeFromPosition(5);
ll.printNode()



// 10 -> 11 -> 12

function getLength(head) {
    let len = 1;
    let temp = head
    while(temp.next !== null) {
        len++
        temp = temp.next;
    }
    return len;
}

function printMiddle(head) {
    if(!head) {
        return; 
    }
    const len = getLength(head);
    let mid = Math.floor(len/2);
    let temp = head;
    while(mid !== 0) {
        temp = temp.next;
        mid = mid - 1;
    } 
    return temp.data;
}

const head = new Node(10);
head.next = new Node(11);
head.next.next = new Node(12);


// console.log(printMiddle(head))