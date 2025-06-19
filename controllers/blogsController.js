const { createClient } = require("@supabase/supabase-js");

const supabaseAnonClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE
);

// Obtener blogs por usuario
exports.getBlogsByUser = async (req, res) => {
    try {
        const { userId } = req.params; // Asumiendo que el userId viene en los parámetros de la ruta
        const { data, error } = await supabaseAnonClient
            .from("blogs")
            .select("*")
            .eq("userId", userId);

        if (error) throw error;
        res.status(200).json({ data });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
    return res;
}

// Obtener todos los blogs
exports.getAllBlogs = async (req, res) => {
    try{
        const {data, error}= await supabaseAnonClient
        .from("blogs")
        .select("*");
        if(error) throw error;
        res.status(200).json({data});
    } catch (err) {
        res.status(err.status || 500).json({error: err.message});
    }
    return res;
};

// Crear un nuevo blog
exports.createBlog = async (req, res) => {
    try {
        const { image_url, title, author, description, content, publish_date, userId } = req.body;
        const { data, error } = await supabaseAnonClient
        .from('blogs')
        .insert({ image_url, title, author, description, content, publish_date, userId })
        if (error) throw error;
        return res.status(201).json({ data });
    } catch (err) {
        return res.status(err.status || 500).json({ error: err.message });
    }
};

// Actualizar un blog
exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { image_url, title, author, description, content, publish_date, userId } = req.body;

        // Añadimos .select() para que nos devuelva filas afectadas
        const { data, error } = await supabaseAnonClient
        .from("blogs")
        .update({ image_url, title, author, description, content, publish_date, userId })
        .eq("id", id)
        .select();         

        if (error) throw error;
        if (!data || data.length === 0) {
        return res.status(404).json({ error: "Blog no encontrado" });
        }

        return res.status(200).json({ data: data[0] });
    } catch (err) {
        console.error("Error en updateBlog:", err);
        return res.status(err.status || 500).json({ error: err.message });
    }
};

// Eliminar un blog
exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabaseAnonClient
        .from("blogs")
        .delete()
        .eq("id", id);

        if (error) throw error;
        res.status(204).send(); // No content en response
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
