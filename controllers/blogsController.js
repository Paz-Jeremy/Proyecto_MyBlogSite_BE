const { createClient } = require("@supabase/supabase-js");

const supabaseAnonClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE
);

// Puedo usar este para obtener todos los blogs filtrados (Para un usuario en especifico)
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

exports.createBlog = async (req, res) => {
    try{
        const {image_url, title, author, description, content, publish_date} = req.body;
        const {data, error} = await supabaseAnonClient
        .from('blogs')
        .insert({
            image_url, title, author, description, content, publish_date
        });
    } catch (err) {
        res.status(err.status || 500).json({error: err.message});
    }

    return res;
};

// Actualizar un blog
exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { image_url, title, author, description, content, publish_date } = req.body;

        const { data, error } = await supabaseAnonClient
        .from("blogs")
        .update({ image_url, title, author, description, content, publish_date })
        .eq("id", id);

        if (error) throw error;
        res.status(200).json({ data: data[0] });
    } catch (err) {
        res.status(400).json({ error: err.message });
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
