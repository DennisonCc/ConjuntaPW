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

    test('percentil 25 de [1,2,3,4]', () => {
      
        expect(percentile(25, [1, 2, 3, 4])).toBe(1.00);
    });
    test('percentil 100 con un solo valor', () => {
        expect(percentile(100, [7])).toBe(7.00);
    });

    test('percentil 10 de lista grande', () => {
        const vals = [15, 20, 35, 40, 50];
        
        expect(percentile(10, vals)).toBe(15.00);
    });

    test('no muta el arreglo original', () => {
        const original = [3, 1, 2];
        percentile(50, original);
        expect(original).toEqual([3, 1, 2]);
    });

   
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
