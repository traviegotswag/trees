// class Person {
//     constructor(name) {
//         this.name = name; // These are instance variables and must be set in the constructor in Javascript.
//         // @name = name?
//         // def initialize (name, weight) 
//         // @name = name
//         // @weight = weight
//   end
//         this.friend = null;
//     }

//     yawn() {
//         console.log(this.name, 'yawns.')
//     }
// }

// const tom = new Person('Tom'); // Creates a new instance of the class Person by calling its constructor
// const bob = new Person('Bob');

// tom.yawn();
// tom.friend = bob;
// tom.friend.yawn();

// A method that takes a callback as a parameter and traverses the entire tree, and executes the given callback on every node.
// A method that takes some data as a parameter and returns true if the tree contains a node with the given data, and false otherwise.
// A method that takes 2 nodes as its parameters and adds the 2nd node as a child of the first node if the first node is found in the tree. If the first node isn't present in the tree, this method should throw an error.

class Tree {
    constructor(node) {
        this.root = node;
    }
    traverse() {
        // console.log(this.root)

    }
}

class Node {
    constructor(value){
        this.value = value,
        this.children = []
    } 
    add(node) {
        this.children.push(node);
    }
}
const root = new Node(2);
// const tree = new Tree(root);
root.add(new Node(7));
root.add(new Node(5));

// console.log(root)
root.children[0].add(new Node(2));
root.children[0].add(new Node(6));
root.children[1].add(new Node(9));

// console.log(root.children[0]);
// console.log(root.children[1]);

root.children[0].children[1].add(new Node(5));
root.children[0].children[1].add(new Node(11));
root.children[1].children[0].add(new Node(4));

console.log(root.children[1].children[0]);

// root.children[1][0].add(new Node(4));

/* Gabriel's solution
* Implementation of a Binary Tree
* With Depth first search & Breadth first search
*/
​
class Tree {
 constructor(node) {
  this.root = node;
 }
​
 addNode(parentNode, newNode) {
  if (parentNode.leftNode === null) {
    parentNode.leftNode = newNode;
    newNode.papa = parentNode;
    return true
  } else if (parentNode.rightNode === null) {
    parentNode.rightNode = newNode;
    newNode.papa = parentNode;
    return true
  } else {
    console.log('ERROR, PARENT HAS NO SLOTS LEFT');
    return false
  }
 }
​
 has(data) {
  let level = [this.root]
​
  while (level.length > 0) {
   let counter = level.length;
   let holder = [];
​
   for (let i = 0; i < level.length; i++) {
    if (level[i].data === data) {
      return true;
    } else {
      if (level[i].leftNode !== null) { holder.push( level[i].leftNode ) };
      if (level[i].rightNode !== null) { holder.push( level[i].rightNode ) };
    }
   }
​
   level = level.concat(holder);
​
   for (let j = 0; j < counter; j++) {
    level.shift();
   }
  }
​
  return false;
 }
​
 doSomething( callBackFunction ) {
  let level = [this.root]
​
  while (level.length > 0) {
   let counter = level.length;
   let holder = [];
​
   for (let i = 0; i < level.length; i++) {
    if (level[i].leftNode !== null) { holder.push( level[i].leftNode ) };
    if (level[i].rightNode !== null) { holder.push( level[i].rightNode ) };
​
    callBackFunction(level[i]);
   }
​
   level = level.concat(holder);
​
   for (let j = 0; j < counter; j++) {
    level.shift();
   }
  }
 }
​
 breadthFirstSearch() {
  let nodes = [this.root];
  let level = 1;
​
  while (nodes.length > 0) {
   console.log("===============");
​
   let currentLevel = [];
   let nextLevel = [];
   for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].leftNode !== null) {
     nextLevel.push(nodes[i].leftNode);
    };
​
    if (nodes[i].rightNode !== null) {
     nextLevel.push(nodes[i].rightNode);
    }
​
    currentLevel.push(nodes[i].data);
   }
​
   nodes = nextLevel.slice(0);
   console.log(currentLevel);
  }
 }
​
 depthFirstSearch() {
  let root = this.root;
  console.log("ROOT: ", root.data);
​
  let nodes = [root.leftNode, root.rightNode];
​
  while (nodes.length > 0) {
   let holder = [];
​
   if (nodes[0].leftNode !== null) {
    holder.push(nodes[0].leftNode);
   }
​
   if (nodes[0].rightNode !== null) {
    holder.push(nodes[0].rightNode);
   }
​
   console.log("DATA: ", nodes.splice(0,1)[0].data);
​
   nodes = [...holder, ...nodes];
  }
 }
}
​
class Node {
 constructor(data) {
  this.leftNode = null;
  this.rightNode = null;
  this.papa = null;
  this.data = data;
 }
}
​
function createTree() {
 let rootNode = new Node(0);
 let tree = new Tree(rootNode);
​
 let level = [rootNode];
​
 for (let i = 1; i < 50; i += 2) {
  tree.addNode( level[0], new Node(i) );
  tree.addNode( level[0], new Node(i + 1) );
​
  level.push( level[0].leftNode, level[0].rightNode );
  level.shift();
 }
 return tree;
}
​
const tree = createTree();
console.log(tree.has(30));
console.log(tree.has(80));
​
function changeNodeData(node) {
 node.data += 10;
}
​
tree.doSomething( changeNodeData );
console.log(tree.has(0));
console.log('root data: ', tree.root.data);
tree.breadthFirstSearch();
tree.depthFirstSearch();