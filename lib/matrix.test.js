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
