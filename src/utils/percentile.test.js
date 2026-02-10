const percentile = require('./percentile');

describe('percentile', () => {
    // Dennison Chalacan 
    test('percentile(0, [1,2,3]) → 1.00 (mínimo)', () => {
        expect(percentile(0, [1, 2, 3])).toBe(1.00);
    });

    test('percentile(100, [1,2,3]) → 3.00 (máximo)', () => {
        expect(percentile(100, [1, 2, 3])).toBe(3.00);
    });

    test('percentile(50, [1,2,3,4]) → 2.00 (nearest-rank)', () => {
        expect(percentile(50, [1, 2, 3, 4])).toBe(2.00);
    });

    // ── Más casos válidos ──
    test('percentil 25 de [1,2,3,4]', () => {
        // rank = ceil(25/100 * 4) = ceil(1) = 1 → sorted[0] = 1
        expect(percentile(25, [1, 2, 3, 4])).toBe(1.00);
    });

    test('percentil 75 de [1,2,3,4]', () => {
        // rank = ceil(75/100 * 4) = ceil(3) = 3 → sorted[2] = 3
        expect(percentile(75, [1, 2, 3, 4])).toBe(3.00);
    });

    test('un solo elemento', () => {
        expect(percentile(50, [42])).toBe(42.00);
    });

    test('datos desordenados se ordenan correctamente', () => {
        expect(percentile(50, [5, 1, 3, 2, 4])).toBe(3.00);
    });

    test('valores con decimales', () => {
        expect(percentile(50, [1.5, 2.5, 3.5])).toBe(2.50);
    });

    test('percentil 0 con un solo valor', () => {
        expect(percentile(0, [7])).toBe(7.00);
    });

    test('percentil 100 con un solo valor', () => {
        expect(percentile(100, [7])).toBe(7.00);
    });

    test('percentil 10 de lista grande', () => {
        const vals = [15, 20, 35, 40, 50];
        // rank = ceil(10/100 * 5) = ceil(0.5) = 1 → sorted[0] = 15
        expect(percentile(10, vals)).toBe(15.00);
    });

    test('percentil 90 de lista grande', () => {
        const vals = [15, 20, 35, 40, 50];
        // rank = ceil(90/100 * 5) = ceil(4.5) = 5 → sorted[4] = 50
        expect(percentile(90, vals)).toBe(50.00);
    });

    test('no muta el arreglo original', () => {
        const original = [3, 1, 2];
        percentile(50, original);
        expect(original).toEqual([3, 1, 2]);
    });

    // ── TypeError ──
    test('lanza TypeError si p no es número', () => {
        expect(() => percentile('50', [1, 2])).toThrow(TypeError);
    });

    test('lanza TypeError si p es NaN', () => {
        expect(() => percentile(NaN, [1, 2])).toThrow(TypeError);
    });

    test('lanza TypeError si values no es arreglo', () => {
        expect(() => percentile(50, 'abc')).toThrow(TypeError);
    });

    test('lanza TypeError si values contiene no-números', () => {
        expect(() => percentile(50, [1, '2', 3])).toThrow(TypeError);
    });

    test('lanza TypeError si values contiene NaN', () => {
        expect(() => percentile(50, [1, NaN, 3])).toThrow(TypeError);
    });

    // ── RangeError ──
    test('lanza RangeError si p < 0', () => {
        expect(() => percentile(-1, [1, 2])).toThrow(RangeError);
    });

    test('lanza RangeError si p > 100', () => {
        expect(() => percentile(101, [1, 2])).toThrow(RangeError);
    });

    test('lanza RangeError si values está vacío', () => {
        expect(() => percentile(50, [])).toThrow(RangeError);
    });
});
