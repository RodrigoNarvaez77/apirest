const express = require('express');
const axios = require('axios');
const app = express.Router(); //crear las instancias del crud

//Mostrar  registro por ID
app.get('/registros/:id',async(req,res) =>{
  const { id } = req.params
  try{
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      res.status(200).json(response.data);
  }catch(err){
      res.status(500).json({mensaje: err.message});
  }
});


// Ruta para obtener todos los posts de JSONPlaceholder
app.get('/registros', async (req, res) => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los posts' });
    }
  });

// Ruta para insertar un registro en JSONPlaceholder
app.post('/post', async (req, res) => {
  console.log('Cuerpo de la solicitud:', req.body);

  // Desestructuramos los datos enviados en el cuerpo de la solicitud
  const { title, body, userId } = req.body;

  try {
    // Validar que se enviaron los datos requeridos
    if (!title || !body || !userId) {
      return res.status(400).json({ success: false, message: 'Faltan datos obligatorios' });
    }

    // Hacer la solicitud POST a JSONPlaceholder
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title,
      body,
      userId,
    });

    // Responder con el resultado de la API
    res.status(201).json({
      success: true,
      message: 'Datos enviados correctamente a JSONPlaceholder',
      data: response.data,
    });
  } catch (error) {
    console.error('Error al enviar datos:', error);
    res.status(500).json({ success: false, message: 'Error al enviar datos', details: error.message });
  }
});

// Ruta para eliminar todos los posts de JSONPlaceholder
app.delete('/eliminar/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Cuerpo de la solicitud:', req.body);
  try {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (response.status === 200) {
      return res.status(200).json({ mensaje: 'Post eliminado correctamente' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los posts' });
  }
});

//Ruta para Modificar un registro por ID
app.put('/modificar/:id',async(req,res) =>{
  const { id } = req.params
  const update = req.body
try{
  const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`,update);
  if (response.status === 200) {
    return res.status(200).json({ mensaje: 'Post modificado correctamente',update });
  }
}catch(err){
  res.status(500).json({mensaje: err.message});
}
});

//eliminar un registro por ID
app.delete('/delete/:id',async(req,res) =>{
  const { id } = req.params
  try{
      const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      res.status(200).json({ mensaje: 'Registro eliminado correctamente', data: response.data });
  }catch(err){
      res.status(500).json({mensaje: err.message});
  }
});

module.exports = app; // Exporta el router

