export default class {

  constructor(rotate, x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.theta = rotate * Math.PI / 180
  }

  getTopLeft () {
    const cx = this.x + this.w / 2
    const cy = this.y + this.h / 2
    const pos = this._getPosition(cx, cy)
    return {
      x: pos.x + cx,
      y: pos.y + cy
    }
  }

  getTopRight () {
    const cx = this.x - this.w / 2
    const cy = this.y + this.h / 2
    const pos = this._getPosition(cx, cy)
    return {
      x: pos.x + cx + this.w,
      y: pos.y + cy
    }
  }

  getBottomRight () {
    const cx = this.x - this.w / 2
    const cy = this.y - this.h / 2
    const pos = this._getPosition(cx, cy)
    return {
      x: pos.x + cx + this.w,
      y: pos.y + cy + this.h
    }
  }

  getBottomLeft () {
    const cx = this.x + this.w / 2
    const cy = this.y - this.h / 2
    const pos = this._getPosition(cx, cy)
    return {
      x: pos.x + cx,
      y: pos.y + cy + this.h
    }
  }

  getValue (x, y) {
    return {
      x: x * Math.cos(this.theta) - y * Math.sin(this.theta),
      y: x * Math.sin(this.theta) + y * Math.cos(this.theta)
    }
  }

  getReverseValue (x, y) {
    return {
      x: y * Math.sin(this.theta) + x * Math.cos(this.theta),
      y: y * Math.cos(this.theta) - x * Math.sin(this.theta)
    }
  }

  _getPosition (cx, cy) {
    const x = this.x - cx
    const y = this.y - cy
    return this.getValue(x, y)
  }

  getDiagonal (width, height) {
    return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
  }

  getPosition (x1, y1, x2, y2) {

    const mx = x2 + (x1 - x2) * 0.5
    const my = y2 + (y1 - y2) * 0.5

    const cos = Math.cos(-this.theta)
    const sin = Math.sin(-this.theta)

    const x1u = cos * (x2 - mx) - sin * (y2 - my) + mx
    const y1u = sin * (x2 - mx) + cos * (y2 - my) + my
    const x2u = cos * (x1 - mx) - sin * (y1 - my) + mx
    const y2u = sin * (x1 - mx) + cos * (y1 - my) + my

    return {
      left: Math.min(x1u, x2u),
      top: Math.min(y1u, y2u),
      width: Math.abs(x1u - x2u),
      height: Math.abs(y1u - y2u)
    }
  }

  /**
   * @param {Number} diag Diagonal of rotate rectangle
   * @return {Number}
   */
  getDiffWidth(diag) {
    return (Math.sin(this.theta) * diag) / (Math.cos(this.theta) * diag)
  }

  /**
   * @param {Number} diag Diagonal of rotate rectangle
   * @return {Number}
   */
  getDiffWidthReverse(diag) {
    return (Math.cos(this.theta) * diag) / (Math.sin(this.theta) * diag)
  }

  /**
   * @param {Number} diag Diagonal of rotate rectangle
   * @return {Number}
   */
  getDiffHeight(diag) {
    return (Math.sin(-this.theta) * diag) / (Math.cos(-this.theta) * diag)
  }

  /**
   * @param {Number} diag Diagonal of rotate rectangle
   * @return {Number}
   */
  getDiffHeightReverse(diag) {
    return (Math.cos(-this.theta) * diag) / (Math.sin(-this.theta) * diag)
  }
}
