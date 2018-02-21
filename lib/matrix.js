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

    map(f) {
        let m = new Matrix(this.rows, this.cols)
        m.data = this.data.map((r, i) => r.map((v, j) => f(v, i, j)))
        return m
    }

    indicies() {
        return this.map((_, i, j) => i)
    }

    randomize() {
        return this.map(() => Math.random() * 2 - 1)
        //return this.map(() => 0.5)
    }

    add(n) {
        if (n instanceof Matrix) {
            return this.map((v, i, j) => v + n.data[i][j])
        }
        if (typeof (n) == 'number') {
            return this.map(v => v + n)
        }
    }

    sub(n) {
        if (n instanceof Matrix) {
            return this.add(n.mult(-1))
        }
        if (typeof (n) == 'number') {
            return this.add(-n)
        }
    }

    dot(n) {
        if (this.cols != n.rows) {
            throw new Error('this.cols != n.rows')
        }

        return new Matrix(this.rows, n.cols)
            .map((_, i, j) => {
                // Dot product of values in col
                let sum = 0;
                for (let k = 0; k < this.cols; k++) {
                    sum += this.data[i][k] * n.data[k][j];
                }
                return sum;
            });
    }

    mult(n) {
        if (n instanceof Matrix) {
            // hadamard product
            return this.map((v, i, j) => v * n.data[i][j]);
        }
        if (typeof (n) == 'number') {
            // Scalar product
            return this.map(v => v * n)
        }
    }

    transpose() {
        return new Matrix(this.cols, this.rows)
            .map((_, i, j) => this.data[j][i])
    }

    print(mess) {
        if (mess) console.log(mess)
        console.table(this.data)
        return this
    }

    mutate(mutationrate) {
        return this.map(v => Math.random() < mutationrate ? Math.max(-1, Math.min(1, (v + Math.random() - 0.5))) : v)
    }

    crossover(other, crossoverrate) {
        return this.map((v, i, j) => Math.random() < crossoverrate ? v : other.data[i][j])
    }
}

if (typeof module !== 'undefined') {
    module.exports = Matrix
}

