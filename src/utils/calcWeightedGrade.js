
function calcWeightedGrade(items) {
    if (!Array.isArray(items)) {
        throw new TypeError('items debe ser un arreglo');
    }//Dennison Chalacan
    if (items.length === 0) {
        throw new RangeError('items no puede estar vacío');
    }
    

    let totalWeight = 0;
    let grade = 0;
    //Dennison Chalacan
    for (const item of items) {
        if (item === null || typeof item !== 'object') {
            throw new TypeError('Cada elemento debe ser un objeto con score y weight');
        }
        if (typeof item.score !== 'number' || typeof item.weight !== 'number') {
            throw new TypeError('score y weight deben ser números');
        }
        if (Number.isNaN(item.score) || Number.isNaN(item.weight)) {
            throw new TypeError('score y weight no pueden ser NaN');
        }
        if (item.score < 0 || item.score > 100) {
            throw new RangeError('score debe estar entre 0 y 100');
        }
        if (item.weight < 0 || item.weight > 1) {
            throw new RangeError('weight debe estar entre 0 y 1');
        }

        totalWeight += item.weight;
        grade += item.score * item.weight;
    }

    if (Math.abs(totalWeight - 1) > 0.001) {
        throw new RangeError('La suma de los pesos debe ser 1 (tolerancia ± 0.001)');
    }

    return parseFloat(grade.toFixed(2));
}

module.exports = calcWeightedGrade;
