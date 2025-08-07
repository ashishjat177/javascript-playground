class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

const root = new Node(10);
root.left = new Node(7);
root.right = new Node(12);

console.log(root);