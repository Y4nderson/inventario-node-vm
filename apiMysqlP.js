const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mysql = require('mysql2'); 

app.use(bodyParser.json());




const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "2004",
    database: 'gestioninventario',
    multipleStatements: true
});

db.connect((err)=>{

    if(err){
        throw err;
    }
    console.log('Conexion exitosa')
})


//PRODUCTOS
//GetSp


//ruta de la api
app.get("/api/productosSp", (req, res) => {

    //el req.query es un objeto que contiene todos los parametros de la url
    //desestructuracion de los parametros recibidos desde la url
    const {
        proceso,
        productoID,
        categoriaID,
        subCategoriaID,
        nombre,
        precioCompra,
        precioVenta,
        stock,
        estado,
        fechaVencimiento
    } = req.query;

    //consulta a la base de datos
    const sqlQuery = "CALL SP_Producto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @respuesta); SELECT @respuesta as respuesta";

    //ejecuta la consulta
    db.query(
        sqlQuery,
        [
            parseInt(proceso),
            parseInt(productoID),
            parseInt(categoriaID),
            parseInt(subCategoriaID),
            nombre || '',
            parseFloat(precioCompra),
            parseFloat(precioVenta),
            parseInt(stock),
            parseInt(estado),
            fechaVencimiento
        ],
        (err, result) => {
            if (err) {
                console.error("Error en el SP:", err);
                return res.status(500).send("Error en el SP");
            }

            
            res.json(result[0]);

        
        }
    );
});



app.post("/api/productosSp", (req, res) => {

    //el req.body es un objeto que contiene todos los parametros del body
    //desestructuracion de los parametros recibidos desde el body
    const {
        proceso,
        productoID,
        categoriaID,
        subCategoriaID,
        nombre,
        precioCompra,
        precioVenta,
        stock,
        estado,
        fechaVencimiento
    } = req.body;

    //consulta a la base de datos
    const sqlQuery = "CALL SP_Producto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @respuesta); SELECT @respuesta as respuesta";

    //ejecuta la consulta
    db.query(
        sqlQuery,
        [
            parseInt(proceso),
            parseInt(productoID),
            parseInt(categoriaID),
            parseInt(subCategoriaID),
            nombre || '',
            parseFloat(precioCompra),
            parseFloat(precioVenta),
            parseInt(stock),
            parseInt(estado),
            fechaVencimiento
        ],
        (err, result) => {
            if (err) {
                console.error("Error en el SP:", err);
                return res.status(500).send("Error en el SP");
            }

            
            res.json(result[1][0]);

        
        }
    );
});


app.put("/api/productosSp", (req, res) => {

    //el req.body es un objeto que contiene todos los parametros del body
    //desestructuracion de los parametros recibidos desde el body
    const {
        proceso,
        productoID,
        categoriaID,
        subCategoriaID,
        nombre,
        precioCompra,
        precioVenta,
        stock,
        estado,
        fechaVencimiento
    } = req.body;

    //consulta a la base de datos
    const sqlQuery = "CALL SP_Producto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @respuesta); SELECT @respuesta as respuesta";

    //ejecuta la consulta
    db.query(
        sqlQuery,
        [
            parseInt(proceso),
            parseInt(productoID),
            parseInt(categoriaID),
            parseInt(subCategoriaID),
            nombre || '',
            parseFloat(precioCompra),
            parseFloat(precioVenta),
            parseInt(stock),
            parseInt(estado),
            fechaVencimiento
        ],
        (err, result) => {
            if (err) {
                console.error("Error en el SP:", err);
                return res.status(500).send("Error en el SP");
            }

            
            res.json(result[1][0]);

        
        }
    );
});


// CATEGORIAS
// GET
app.get("/api/categoriasSp", (req, res) => {
    const {
        proceso,
        categoriaID,
        nombre,
        estado,
        usuarioID
    } = req.query;

    // Validación rápida opcional
    if (usuarioID === undefined) {
        console.warn("GET → usuarioID no recibido");
    }

    const sqlQuery = "CALL SP_Categoria(?, ?, ?, ?, @respuesta); SELECT @respuesta as respuesta";

    db.query(
        sqlQuery,
        [
            parseInt(proceso),
            parseInt(categoriaID),
            nombre || '',
            parseInt(usuarioID)
        ],
        (err, result) => {
            if (err) {
                console.error("Error en el SP:", err);
                return res.status(500).send("Error en el SP");
            }

            res.json(result[0]);
        }
    );
});

// POST
app.post("/api/categoriasSp", (req, res) => {
    const {
        proceso,
        categoriaID,
        nombre,
        estado,
        usuarioID
    } = req.body;

    
    if (
        proceso === undefined ||
        categoriaID === undefined ||
        nombre === undefined ||
        estado === undefined ||
        usuarioID === undefined
    ) {
        console.error("POST → Faltan parámetros");
        return res.status(400).json({ error: "Faltan parámetros" });
    }

    const params = [
        parseInt(proceso),
        parseInt(categoriaID),
        nombre || '',
        parseInt(usuarioID) // ¡ojo! estado no se manda al SP, no es parte del procedimiento
    ];

    console.log("POST → Parámetros enviados al SP:", params);

    const sqlQuery = "CALL SP_Categoria(?, ?, ?, ?, @respuesta); SELECT @respuesta as respuesta";

    db.query(sqlQuery, params, (err, result) => {
        if (err) {
            console.error("Error en el SP:", err);
            return res.status(500).send("Error en el SP");
        }

        res.json(result[1][0]);
    });
});

// PUT
app.put("/api/categoriasSp", (req, res) => {
    const {
        proceso,
        categoriaID,
        nombre,
        usuarioID
    } = req.body;

    
    if (
        proceso === undefined ||
        categoriaID === undefined ||
        nombre === undefined ||
        usuarioID === undefined
    ) {
        console.error("POST → Faltan parámetros");
        return res.status(400).json({ error: "Faltan parámetros" });
    }

    const params = [
        parseInt(proceso),
        parseInt(categoriaID),
        nombre || '',
        parseInt(usuarioID) 
    ];

    console.log("PUT → Parámetros enviados al SP:", params);

    const sqlQuery = "CALL SP_Categoria(?, ?, ?, ?, @respuesta); SELECT @respuesta as respuesta";

    db.query(sqlQuery, params, (err, result) => {
        if (err) {
            console.error("Error en el SP:", err);
            return res.status(500).send("Error en el SP");
        }

        res.json(result[1][0]);
    });
});

// DELETE
app.delete("/api/categoriasSp", (req, res) => {
    const {
        proceso,
        categoriaID,
        nombre,
        usuarioID
    } = req.query;

    
    if (
        proceso === undefined ||
        categoriaID === undefined 
      
    ) {
        console.error("DELETE → Faltan parámetros");
        return res.status(400).json({ error: "Faltan parámetros" });
    }

    const params = [
        parseInt(proceso),
        parseInt(categoriaID),
         nombre || '',
        parseInt(usuarioID) 

    ];

    console.log("DELETE → Parámetros enviados al SP:", params);

    const sqlQuery = "CALL SP_Categoria(?, ?, ?, ?, @respuesta); SELECT @respuesta as respuesta";

    db.query(sqlQuery, params, (err, result) => {
        if (err) {
            console.error("Error en el SP:", err);
            return res.status(500).send("Error en el SP");
        }

        res.json(result[1][0]);
    });
});



//MOVIMIENTOS
// GET
app.get("/api/movimientosSp", (req, res) => {
    const {
        proceso,
        movimientoID,
        productoID,
        tipoMovimiento,
        cantidad,
        descripcion,
        usuarioID
    } = req.query;

    // Validación rápida opcional
    if (usuarioID === undefined) {
        console.warn("GET → usuarioID no recibido");
    }

    const sqlQuery = "CALL SP_MOVIMIENTOS(?, ?, ?, ?,?,?,?, @respuesta); SELECT @respuesta as respuesta";

    db.query(
        sqlQuery,
        [
            parseInt(proceso),
            parseInt(movimientoID),
            parseInt(productoID),
              tipoMovimiento || '',
            parseInt(cantidad),
              descripcion || '',
            parseInt(usuarioID)
        ],
        (err, result) => {
            if (err) {
                console.error("Error en el SP:", err);
                return res.status(500).send("Error en el SP");
            }

            res.json(result[0]);
        }
    );
});


// POST
app.post("/api/movimientosSp", (req, res) => {
    const {
        proceso,
        movimientoID,
        productoID,
        tipoMovimiento,
        cantidad,
        descripcion,
        usuarioID
    } = req.body;

    
    if (
        proceso === undefined ||
        movimientoID === undefined ||
        productoID === undefined ||
        tipoMovimiento === undefined ||
        cantidad === undefined ||
        descripcion === undefined ||
        usuarioID === undefined
    ) {
        console.error("POST → Faltan parámetros");
        return res.status(400).json({ error: "Faltan parámetros" });
    }

    const params = [
         parseInt(proceso),
            parseInt(movimientoID),
            parseInt(productoID),
              tipoMovimiento || '',
            parseInt(cantidad),
              descripcion || '',
            parseInt(usuarioID)
    ];

    console.log("POST → Parámetros enviados al SP:", params);

    const sqlQuery = "CALL SP_MOVIMIENTOS(?, ?, ?, ?,?,?,?, @respuesta); SELECT @respuesta as respuesta";

    db.query(sqlQuery, params, (err, result) => {
        if (err) {
            console.error("Error en el SP:", err);
            return res.status(500).send("Error en el SP");
        }

        res.json(result[1][0]);
    });
});




app.delete("/api/movimientosSp", (req, res) => {
    const {
        proceso,
        movimientoID,
        productoID,
        tipoMovimiento,
        cantidad,
        descripcion,
        usuarioID
    } = req.query;

    if (
         proceso === undefined ||
        movimientoID === undefined ||
        productoID === undefined ||
        tipoMovimiento === undefined ||
        cantidad === undefined ||
        descripcion === undefined ||
        usuarioID === undefined
    ) {
        console.error("DELETE → Faltan parámetros");
        return res.status(400).json({ error: "Faltan parámetros" });
    }

    const params = [
         parseInt(proceso),
            parseInt(movimientoID),
            parseInt(productoID),
              tipoMovimiento || '',
            parseInt(cantidad),
              descripcion || '',
            parseInt(usuarioID)
    ];

    console.log("DELETE → Parámetros enviados al SP:", params);

const sqlQuery = "CALL SP_MOVIMIENTOS(?, ?, ?, ?,?,?,?, @respuesta); SELECT @respuesta as respuesta";

    db.query(sqlQuery, params, (err, result) => {
        if (err) {
            console.error("Error en el SP:", err.sqlMessage || err);
            return res.status(500).send("Error en el SP");
        }

        res.json(result[1][0]);
    });
});

//------------------------------------------------------------------------------------------------------------------------------------------------------------


app.listen(4200, () => {
    console.log("Escuchando por el puerto 4200");
});