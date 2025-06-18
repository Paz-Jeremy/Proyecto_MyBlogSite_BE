const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

// Aumentamos el límite de body para JSON y formularios URL‑encoded
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

//Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/blogs', require('./routes/blogsRoutes'))
const PORT = process.env.PORT || 3001;
app.listen(
    PORT, 
    ()=>console.log(`Servidor corriendo en puerto ${PORT}`));