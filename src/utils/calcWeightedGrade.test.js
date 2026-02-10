const calcWeightedGrade = require('./calcWeightedGrade');

describe('calcWeightedGrade', () => {
    // Dennison Chalacan
    test('80×0.4 + 90×0.6 → 86.00', () => {
        const result = calcWeightedGrade([
            { score: 80, weight: 0.4 },
            { score: 90, weight: 0.6 }
        ]);
        expect(result).toBe(86.00);
    });

    // ── Casos válidos ──
    test('un solo componente con peso 1', () => {
        expect(calcWeightedGrade([{ score: 95, weight: 1 }])).toBe(95.00);
    });

    test('tres componentes ponderados', () => {
        const result = calcWeightedGrade([
            { score: 70, weight: 0.3 },
            { score: 80, weight: 0.3 },
            { score: 100, weight: 0.4 }
        ]);
        expect(result).toBe(85.00);
    });

    test('todos con score 0', () => {
        expect(calcWeightedGrade([
            { score: 0, weight: 0.5 },
            { score: 0, weight: 0.5 }
        ])).toBe(0.00);
    });

    test('todos con score 100', () => {
        expect(calcWeightedGrade([
            { score: 100, weight: 0.5 },
            { score: 100, weight: 0.5 }
        ])).toBe(100.00);
    });

    test('tolera suma de pesos = 1.0009 (dentro de ± 0.001)', () => {
        expect(calcWeightedGrade([
            { score: 50, weight: 0.5005 },
            { score: 60, weight: 0.5004 }
        ])).toBeCloseTo(55.00, 1);
    });

    // ── TypeError ──
    test('lanza TypeError si items no es arreglo', () => {
        expect(() => calcWeightedGrade('hola')).toThrow(TypeError);
    });

    test('lanza TypeError si items es null', () => {
        expect(() => calcWeightedGrade(null)).toThrow(TypeError);
    });

    test('lanza TypeError si un elemento no es objeto', () => {
        expect(() => calcWeightedGrade([42])).toThrow(TypeError);
    });

    test('lanza TypeError si un elemento es null', () => {
        expect(() => calcWeightedGrade([null])).toThrow(TypeError);
    });

    test('lanza TypeError si score no es número', () => {
        expect(() => calcWeightedGrade([{ score: '80', weight: 0.5 }])).toThrow(TypeError);
    });

    test('lanza TypeError si weight no es número', () => {
        expect(() => calcWeightedGrade([{ score: 80, weight: '0.5' }])).toThrow(TypeError);
    });

    test('lanza TypeError si score es NaN', () => {
        expect(() => calcWeightedGrade([{ score: NaN, weight: 1 }])).toThrow(TypeError);
    });

    test('lanza TypeError si weight es NaN', () => {
        expect(() => calcWeightedGrade([{ score: 80, weight: NaN }])).toThrow(TypeError);
    });

    // ── RangeError ──
    test('lanza RangeError si items está vacío', () => {
        expect(() => calcWeightedGrade([])).toThrow(RangeError);
    });

    test('lanza RangeError si score < 0', () => {
        expect(() => calcWeightedGrade([{ score: -1, weight: 1 }])).toThrow(RangeError);
    });

    test('lanza RangeError si score > 100', () => {
        expect(() => calcWeightedGrade([{ score: 101, weight: 1 }])).toThrow(RangeError);
    });

    test('lanza RangeError si weight < 0', () => {
        expect(() => calcWeightedGrade([{ score: 50, weight: -0.1 }])).toThrow(RangeError);
    });

    test('lanza RangeError si weight > 1', () => {
        expect(() => calcWeightedGrade([{ score: 50, weight: 1.5 }])).toThrow(RangeError);
    });

    test('lanza RangeError si pesos no suman 1', () => {
        expect(() => calcWeightedGrade([
            { score: 80, weight: 0.3 },
            { score: 90, weight: 0.3 }
        ])).toThrow(RangeError);
    });

    test('lanza RangeError si pesos suman más de 1 fuera de tolerancia', () => {
        expect(() => calcWeightedGrade([
            { score: 80, weight: 0.6 },
            { score: 90, weight: 0.6 }
        ])).toThrow(RangeError);
    });
});
