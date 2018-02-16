const Matrix = require('./matrix')

test('add scalar to matrix', () => {
    let m = new Matrix(3, 3)
    m.data[0] = [1, 2, 3]
    m.data[1] = [4, 5, 6]
    m.data[2] = [7, 8, 9]
    let m2 = m.add(1)
    expect(m2).toEqual({
        rows: 3,
        cols: 3,
        data: [
            [2, 3, 4],
            [5, 6, 7],
            [8, 9, 10]
        ]
    })
})

test('add matrix to other matrix', () => {
    let m = new Matrix(2, 2)
    m.data[0] = [1, 2]
    m.data[1] = [3, 4]
    let n = new Matrix(2, 2)
    n.data[0] = [10, 11]
    n.data[1] = [12, 13]
    let o = m.add(n)
    expect(o).toEqual({
        rows: 2,
        cols: 2,
        data: [
            [11, 13],
            [15, 17]
        ]
    })
})

test('subtract matrix from other matrix', () => {
    let m = new Matrix(2, 2)
    m.data[0] = [10, 11]
    m.data[1] = [12, 13]
    let n = new Matrix(2, 2)
    n.data[0] = [1, 2]
    n.data[1] = [3, 4]
    let mMinusN = Matrix.subtract(m, n)
    expect(mMinusN).toEqual({
        rows: 2,
        cols: 2,
        data: [
            [9, 9],
            [9, 9]
        ]
    })
})