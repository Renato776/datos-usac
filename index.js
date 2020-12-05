const { query } = require('./renato_modules/rdb');
GRAPHS={
    'graduados': {
        1: {
            'structure': 2,
            'type': 'bar',
            'color': 'purple',
            'layout': {
                'title': 'Profesionales graduados por edad al momento de graduarse',
                'yaxis': { 'title': 'cantidad' }
            }
        },
        2: {
            'structure': 1,
            'type': 'scatter',
            'layout': {
                'title': 'Numero de profesionales graduados por carrera divididos por rango de edad',
                'xaxis': { 'title': 'Rango de edades' },
                'yaxis': { 'title': 'cantidad' }
            }
        },
        3: {
            'structure': 2,
            'type': 'bar',
            'color': 'magenta',
            'layout': {
                'title': 'Numero de profesionales graduados por promedio de notas al graduarse',
                'yaxis': { 'title': 'cantidad' }
            }
        },
        4: {
            'structure': 1,
            'type': 'scatter',
            'layout': {
                'title': 'Numero de profesionales graduados por promedio de notas al graduarse',
                'xaxis': { 'title': 'promedio' },
                'yaxis': { 'title': 'cantidad' }
            }
        },
        5: {
            'structure': 2,
            'type': 'bar',
            'color': 'brown',
            'layout': {
                'title': 'Cantidad total de profesionales graduados por carrera desde el 2009',
                'yaxis': { 'title': 'cantidad' }
            }
        },
        6: {
            'structure': 2,
            'type': 'bar',
            'color': 'green',
            'layout': {
                'title': 'Indice de graduacion por carrera',
                'yaxis': { 'title': 'Indice de graduacion' }
            }
        },
        7: {
            'structure': 1,
            'type': 'scatter',
            'layout': {
                'title': 'Indice de graduacion por carrera cada anio',
                'xaxis': { 'title': 'anio' },
                'yaxis': { 'title': 'Indice de graduacion' }
            }
        },
        8: {
            'structure': 1,
            'type': 'scatter',
            'layout': {
                'title': 'Cantidad de profesionales graduados por carrera por anio',
                'xaxis': { 'title': 'anio' },
                'yaxis': { 'title': 'cantidad' }
            }
        },
        9: {
            'structure': 2,
            'type': 'bar',
            'color': 'green',
            'layout': {
                'title': 'Cantidad promedio de profesionales graduados cada anio por carrera',
                'yaxis': { 'title': 'cantidad' }
            }
        },
        10: {
            'structure': 1,
            'type': 'scatter',
            'layout': {
                'title': 'Indice de graduacion por carrera por generacion',
                'xaxis': { 'title': 'generacion' },
                'yaxis': { 'title': 'Indice de graduacion' }
            }
        },
        11: {
            'structure': 2,
            'type': 'bar',
            'color': 'aqua',
            'layout': {
                'title': 'Indice de graduacion de la facultad por generacion',
                'yaxis': { 'title': 'Indice de graduacion' }
            }
        },
        12: {
            'structure': 2,
            'type': 'bar',
            'color': 'purple',
            'layout': {
                'title': 'Promedio de notas al graduarse promedio de cada carrera',
                'yaxis': { 'title': 'Promedio' }
            }
        },
        13: {
            'structure': 2,
            'type': 'bar',
            'color': 'darcyan',
            'layout': {
                'title': 'Edad promedio del profesional graduado por carrera',
                'yaxis': { 'title': 'Edad' }
            }
        }
    },
    'inscritos':{
        1: {
            'structure': 2,
            'type': 'bar',
            'color': 'purple',
            'layout': {
                'title': 'Cantidad de alumnos que se han inscrito en cada carrera desde 2009',
                'yaxis': { 'title': 'cantidad' }
            }
        },
        2: {
            'structure': 1,
            'type': 'scatter',
            'layout': {
                'title': 'Cantidad de alumnos que se han inscrito por cada carrera por anio',
                'xaxis': { 'title': 'anio' },
                'yaxis': { 'title': 'cantidad' }
            }
        },
        3: {
            'structure': 2,
            'type': 'bar',
            'color': 'green',
            'layout': {
                'title': 'Cantidad de alumnos inscritos en la facultad por anio',
            }
        },
        4: {
            'structure': 3,
            'type': 'bar',
            'layout': {
                'title': 'Cantidad de alumnos inscritos en cada carrera, por anio y sexo',
                'barmode': 'group'
            }
        },
        5: {
            'structure': 1,
            'type': 'scatter',
            'layout': {
                'title': 'Cantidad de alumnos inscritos en la facultad por anio y sexo',
                'xaxis': { 'title': 'anio' },
                'yaxis': { 'title': 'cantidad' }
            }
        },
        6: {
            'structure': 1,
            'type': 'bar',
            'layout': {
                'title': 'Cantidad de alumnos inscritos por carrera por sexo, en total desde el 2009',
                'barmode': 'group'
            }
        },
        7: {
            'structure': 2,
            'type': 'bar',
            'color': 'magenta',
            'layout': {
                'title': 'Cantidad de alumnos inscritos en la facultad de paises extranjeros desde el 2009',
            }
        },
        8: {
            'structure': 1,
            'type': 'scatter',
            'layout': {
                'title': 'Cantidad de alumnos de nuevo ingreso inscritos en cada carrera cada anio',
                'xaxis': { 'title': 'anio' },
                'yaxis': { 'title': 'cantidad' }
            }
        },
        9: {
            'structure': 2,
            'type': 'bar',
            'color': 'aqua',
            'layout': {
                'title': 'Cantidad total de alumnos de nuevo ingreso inscritos en la facultad cada anio',
            }
        },
        10: {
            'structure': 2,
            'type': 'bar',
            'color': 'darkcyan',
            'layout': {
                'title': 'Total de alumnos de nuevo ingreso que se han inscrito en cada carrera desde el 2009 ',
            }
        }
    }
}
function format_name(n){
    if ( isNaN ( Number(n) ) ) 
    return n.toString().replace("INGENIERIA ","").replace("LICENCIATURA EN ","")
    else return Number(n)
}

function format_axis(L){
    const A = [];
    for ( const n of L ) {
        A.push(format_name(n))
    }
    return A
}

function initialize_trace(tupla,dataset,code) {
    const structure = GRAPHS[dataset][code]['structure']
    if ( structure == 1 )
        return {
            'x': [tupla[1]],
            'y': [tupla[2]],
            'type': GRAPHS[dataset][code]['type'],
            'name': format_name(tupla[0])
        }
    else if ( structure == 2  )
        return {
            'x': [tupla[0]],
            'y': [tupla[1]],
            'type': GRAPHS[dataset][code]['type']
        }
    else if ( structure == 3 )
        return {
            'x': [tupla[1]],
            'y': [tupla[2]],
            'z': [tupla[3]],
            'type': GRAPHS[dataset][code]['type'],
            'name': format_name(tupla[0])
        }
}

function update_trace(trace,tupla,dataset,code) {
    const structure = GRAPHS[dataset][code]['structure']
    if ( structure == 1 ) {
        trace['x'].push(tupla[1])
        trace['y'].push(tupla[2])
    } else if ( structure == 2 ) {
        trace['x'].push(tupla[0])
        trace['y'].push(tupla[1])
    }
    return trace
}

function toTuple(record){
    const ren = [];
    for( const key in record ) ren.push( record[key] );
    return ren;
}
function transpose(data){
    if ( !data ) return [];
    if ( !Array.isArray(data) ) return [];
    if ( data.length < 1 ) return []; 
    const first = data[0];
    const res = [];
    for ( const key in first ) res.push([]);
    for ( const rec of data ) {
        let c = 0;
        for ( const key in rec ) {
            res[c].push(rec[key]);
            c++;
        }
    }
    return res;
}
async function main(code,dataset){
    const v = await query (`select * from ${dataset}_${code}`);
    let current = ''
    let mots7 = []
    const structure = GRAPHS[dataset][code]['structure']
    if ( structure == 1 ) {
        for ( const record of v ){
            const t = mots7.length - 1
            const jk = toTuple(record)
            if  ( jk[0] != current ) 
                mots7.push(initialize_trace(jk,dataset,code))
            else mots7[t] = update_trace(mots7[t],jk,dataset,code)
            current = jk[0]
        }
    }
    else if ( structure == 2 ) {
        const rm = transpose(v)
        mots7.push({
            'type': GRAPHS[dataset][code]['type'],
            'x': format_axis(rm[0]),
            'y': format_axis(rm[1]),
            'marker' : {
                'color': GRAPHS[dataset][code]['color']
            }
        })
    }
    return { 'data': mots7, 'layout': GRAPHS[dataset][code]['layout'] }
}
exports.graphs = GRAPHS;
exports.fetch = main;

