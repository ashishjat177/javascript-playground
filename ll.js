// find middle of link list


class Node {
    constructor(data) {
        this.next = null;
        this.data = data;
    }
}

const ll = new Node(3);
ll.next = new Node(5);
ll.next.next = new Node(6);
ll.next.next.next = new Node(8);
ll.next.next.next.next = new Node(9)
ll.next.next.next.next.next = new Node(12);
ll.next.next.next.next.next.next = new Node(12);


var findMiddle = function(head) {
    if(!head) {
        return null;
    }
     let a = head;
     let  b = head;

   while(a && a.next !== null) {
            a = a.next.next;
            b = b.next;
   }
   return b;
};

findMiddle(ll)

