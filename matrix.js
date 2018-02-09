class Matrix {
    constructor(rows = 2, cols = 2) {
        this.rows = rows
        this.cols = cols
        this.data = Array(rows).fill().map(() => Array(cols).fill(0))
    }

    static fromArray(arr) {
        let m = new Matrix(arr.length, 1)
        m.data = arr.map(n => [n])
        return m
    }

    toArray() {
        let a = []
        this.map(x => a.push(x))
        return a
    }

    // scalar operations
    scalar_apply(f) {
        let m = new Matrix(this.rows, this.cols)
        m.data = this.data.map(r => r.map(f))
        return m
    }

    map(f) {
        let m = new Matrix(this.rows, this.cols)
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                m.data[i][j] = f(this.data[i][j], i, j)
            }
        }
        return m
    }

    randomize() {
        this.data = this.scalar_apply(() => Math.random() * 2 - 1).data
        return this
    }

    add(n) {
        if (n instanceof Matrix) {
            return this.map((v, i, j) => v + n.data[i][j])
        } else if (typeof (n) == 'number') {
            return this.scalar_apply(m => m + n)
        }
    }

    sub(n) {
        if (n instanceof Matrix) {
            return this.add(n.mult(-1))
        } else if (typeof (n) == 'number') {
            return this.add(-n)
        }
    }

    mult(n) {
        if (n instanceof Matrix) {
            // dot product
            if (this.cols != n.rows) {
                return undefined
            }
            let a = this.data
            let b = n.data
            let m = new Matrix(this.rows, n.cols)
            for (let i = 0; i < m.rows; i++) {
                for (let j = 0; j < m.cols; j++) {
                    let sum = 0;
                    for (let k = 0; k < this.rows; k++) {
                        sum += a[i][k] * b[k][j]
                    }
                    m.data[i][j] = sum
                }
            }
            return m
        } else if (typeof (n) == 'number') {
            return this.scalar_apply(m => m * n)
        }
    }

    transpose() {
        let m = new Matrix(this.cols, this.rows)
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                m.data[j][i] = this.data[i][j]
            }
        }
        return m
    }

    print(mess) {
        if (mess) console.log(mess)
        console.table(this.data)
        return this
    }
}
