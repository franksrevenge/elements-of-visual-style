/**
 * YX notated Matrix
 * @param {int|Matrix|Array} width
 * @param {int} height
 * @constructor
 */
export class Matrix {
  constructor(width, height) {
    this.data = [];
    this.width = 0;
    this.height = 0;

    if (width instanceof Matrix) {
      this.set(width);
    } else if (width instanceof Array) {
      this.set(width);
    } else {
      this.resize(width, height);
    }
  };


  /**
   * @returns {Matrix}
   * @public
   */
  clone() {
    const m = new Matrix(this.width, this.height);

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        m.data[y][x] = this.data[y][x];
      }
    }

    return m;
  }


  /**
   * @param {Matrix|Array} matrix
   * @public
   */
  set(matrix) {
    if (matrix instanceof Array) {
      this.data = new Array(matrix.length);

      this.height = matrix.length;
      this.width = matrix[0].length;

      for (let y = 0; y < matrix.length; y++) {
        this.data[y] = matrix[y].slice(0);
      }
    } else {
      this.data = new Array(matrix.data.length);
      this.height = matrix.height;
      this.width = matrix.width;

      for (let y = 0; y < matrix.data.length; y++) {
        this.data[y] = matrix.data[y].slice(0);
      }
    }
  }


  /**
   * @param {int} width
   * @param {int} height
   * @public
   */
  resize(width, height) {
    this.data = new Array(height);
    this.width = width;
    this.height = height;

    for (let y = 0; y < height; y++) {
      this.data[y] = new Array(width);
    }
  }


  /**
   * sourcePoint and targetPoint MUST NOT be the same object
   *
   * @param {Point3D} sourcePoint
   * @param {Point3D} targetPoint
   * @todo Remove hardcoding
   * @public
   */
  multiplyPoint3D(sourcePoint, targetPoint) {
    targetPoint.x = sourcePoint.x * this.data[0][0] +
      sourcePoint.y * this.data[0][1] +
      sourcePoint.z * this.data[0][2];

    targetPoint.y = sourcePoint.x * this.data[1][0] +
      sourcePoint.y * this.data[1][1] +
      sourcePoint.z * this.data[1][2];

    targetPoint.z = sourcePoint.x * this.data[2][0] +
      sourcePoint.y * this.data[2][1] +
      sourcePoint.z * this.data[2][2];
  }


  /**
   * @param {Matrix} matrix
   * @returns {Matrix}
   * @public
   */
  multiplyMatrix(matrix) {
    if (this.height !== matrix.width) {
      return null;
    }

    const m = new Matrix(matrix.width, this.height);
    const size = this.height;

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < matrix.width; x++) {
        let val = 0;

        for (let i = 0; i < size; i++) {
          val += this.data[y][i] * matrix.data[i][x];
        }

        m.data[y][x] = val;
      }
    }

    return m;
  }


  /**
   * @param {Matrix} matrix
   * @public
   */

  add(matrix) {
    if ((this.width !== matrix.width) || (this.height !== matrix.height)) {
      return;
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < matrix.width; x++) {
        this.data[y][x] += matrix.data[y][x];
      }
    }
  }


  /**
   * @param {Matrix} matrix
   * @public
   */
  subtract(matrix) {
    if ((this.width !== matrix.width) || (this.height !== matrix.height)) {
      return;
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < matrix.width; x++) {
        this.data[y][x] -= matrix.data[y][x];
      }
    }
  }


  /**
   * @returns {Matrix}
   * @public
   */
  transpose() {
    const t = new Matrix(this.height, this.width);

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        t.data[x][y] = this.data[y][x];
      }
    }

    return t;
  }
}
