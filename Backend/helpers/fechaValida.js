const esFechaValida = fecha => {
    try {
        const { inicio, fin } = fecha;

        if (!/^\d{4}-\d{2}-\d{2}$/.test(inicio) || !/^\d{4}-\d{2}-\d{2}$/.test(fin)) {
            throw new Error('El formato de la fecha no es válido');
        }

        return true;
    } catch (error) {
        throw new Error('La fecha no tiene un formato válido');
    }
}


module.exports = {
    esFechaValida
}