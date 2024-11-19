var pool = require('./bd');

async function getArticulo() {
    var query = "select * from staff order by id asc";
    var rows = await pool.query(query);
    return rows
}

async function insertarArticulo(obj) {
    try{
        var query = "insert into staff set ?";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error){
        console.log(error);
        throw error;
    }
}

async function deleteArticuloById(id){
    var query = "delete from staff where id = ?";
    var rows = await pool.query(query, [id]);
    return rows;
}

async function getArticuloById(id){
    var query = "select * from staff where id = ? ";
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function modificarArticuloById(obj, id){
    try{
        var query = "update staff set ? where id=?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch(error){
        throw error;
    }
    
}

module.exports = { modificarArticuloById, getArticuloById, deleteArticuloById, insertarArticulo, getArticulo }