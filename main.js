var paper = Snap('#main-container')

var selected = [];

var t1 = document.querySelector('#t1');
var t2 = document.querySelector('#t2');

selected = [t1,t2];

// var selection = paper.g();

// selection.append(t1);
// selection.append(t2);

// paper.freeTransform(selection);
var set = Snap.set(Snap(t1),Snap(t2));

paper.freeTransform(set);

set.clear();

console.log(set)