
//Dennison Chalacan
function percentile(p, values) {
    if (typeof p !== 'number' || Number.isNaN(p)) {
        throw new TypeError('p debe ser un número');
    }
    if (p < 0 || p > 100) {
        throw new RangeError('p debe estar entre 0 y 100');
    }
    if (!Array.isArray(values)) {
        throw new TypeError('values debe ser un arreglo');
    }
    if (values.length === 0) {
        throw new RangeError('values no puede estar vacío');
    }
    for (const v of values) {
        if (typeof v !== 'number' || Number.isNaN(v)) {
            throw new TypeError('Todos los elementos de values deben ser números');
        }
    }

    const sorted = [...values].sort((a, b) => a - b);
    const n = sorted.length;

    //Dennison Chalacan
    if (p === 0) {
        return Number.parseFloat(sorted[0].toFixed(2));
    }
    if (p === 100) {
        return Number.parseFloat(sorted[n - 1].toFixed(2));
    }

    
    const rank = Math.ceil((p / 100) * n);
    return Number.parseFloat(sorted[rank - 1].toFixed(2));
}

module.exports = percentile;
