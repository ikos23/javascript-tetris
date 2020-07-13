// you know these :)
// |x|                            |x|
// |x|     |x|x|x|      |x|X|     |x|x|
// |x|x| , |x|     ,  |x|x|   ,   |x|   , ...

const tetromino = {
  getBody() {
    return this.bodys[this.rotation];
  },

  rotate() {
    const rotations = this.bodys.length;

    if (rotations === 1) {
      return this.getBody();
    } else if (rotations === 2) {
      if (this.rotation === 0) {
        this.rotation = 1;
        return this.bodys[0];
      } else {
        this.rotation = 0;
        return this.bodys[1];
      }
    } else {
      switch (this.rotation) {
        case 0: {
          this.rotation = 1;
          return this.bodys[0];
        }
        case 1: {
          this.rotation = 2;
          return this.bodys[1];
        }
        case 2: {
          this.rotation = 3;
          return this.bodys[2];
        }
        case 3: {
          this.rotation = 0;
          return this.bodys[3];
        }
        default:
          throw new Error("This should never happen.");
      }
    }
  },

  nextRotation() {
    const current = this.rotation;
    const next = current + 1 === this.bodys.length ? 0 : current + 1;
    return this.bodys[next];
  },

  height() {
    const maxY = Math.max(...this.getBody().map((coords) => coords[1]));
    return maxY + 1; // y-axis is 0-based
  },

  width() {
    const maxX = Math.max(...this.getBody().map((coords) => coords[0]));
    return maxX + 1;
  },
};

export function StraightTetromino() {
  // |x|
  // |x| OR |x|x|x|x|
  // |x|
  // |x|
  this.rotation = 0;
  this.color = "#00ccff";
  this.bodys = [
    [
      // horizontal
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
    [
      // vertical
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
  ];

  return {
    getBody: this.getBody.bind(this),
    nextRotation: this.nextRotation.bind(this),
    rotate: this.rotate.bind(this),
    getHeight: this.height.bind(this),
    getWidth: this.width.bind(this),
    getColor: () => this.color,
  };
}
StraightTetromino.prototype = tetromino;

export function S_Tetromino() {
  // |x|x|     |x|
  //   |x|x| , |x|x|
  //             |x|
  this.bodys = [
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
    ],
  ];
  this.rotation = 0;
  this.color = "#00ff00";

  return {
    getBody: this.getBody.bind(this),
    nextRotation: this.nextRotation.bind(this),
    rotate: this.rotate.bind(this),
    getHeight: this.height.bind(this),
    getWidth: this.width.bind(this),
    getColor: () => this.color,
  };
}
S_Tetromino.prototype = tetromino;

export function SquareTetromino() {
  // |x|x|
  // |x|x|
  // no rotations :)
  this.bodys = [
    [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
    ],
  ];
  this.color = "#ffff00";
  this.rotation = 0;

  return {
    getBody: this.getBody.bind(this),
    nextRotation: this.nextRotation.bind(this),
    rotate: this.rotate.bind(this),
    getHeight: () => 2,
    getWidth: () => 2,
    getColor: () => this.color,
  };
}
SquareTetromino.prototype = tetromino;

export function T_Tetromino() {
  //   |x|     |x|x|x|
  // |x|x|x| ,   |x|   , ...
  this.bodys = [
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 1],
    ],
    [
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
  ];
  this.rotation = 0;
  this.color = "#9900cc";

  return {
    getBody: this.getBody.bind(this),
    nextRotation: this.nextRotation.bind(this),
    rotate: this.rotate.bind(this),
    getHeight: this.height.bind(this),
    getWidth: this.width.bind(this),
    getColor: () => this.color,
  };
}
T_Tetromino.prototype = tetromino;

export function L_Tetromino() {
  // |x|
  // |x|     |x|x|x|
  // |x|x| , |x|   , ...
  this.bodys = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
    ],
  ];
  this.rotation = 0;
  this.color = "#ff3300";

  return {
    getBody: this.getBody.bind(this),
    nextRotation: this.nextRotation.bind(this),
    rotate: this.rotate.bind(this),
    getHeight: this.height.bind(this),
    getWidth: this.width.bind(this),
    getColor: () => this.color,
  };
}
L_Tetromino.prototype = tetromino;
