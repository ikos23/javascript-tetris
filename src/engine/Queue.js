// just a FIFO queue
function Queue() {
  this.elements = [];
}

Queue.prototype.enqueue = function (e) {
  this.elements.push(e);
};

Queue.prototype.dequeue = function () {
  return this.elements.shift();
};

Queue.prototype.isEmpty = function () {
  return this.elements.length === 0;
};

Queue.prototype.clear = function () {
  this.elements = [];
};

export default Queue;
