const express = require("express"); // Use express
const app = express(); // Take express library into app variable. App now has all methods to create server from express
const cors = require("cors");
const pool = require("./db"); // Run queries to DB


// Middleware //
app.use(cors()); // Allow ports 3000 front and 5000 back to communicate
app.use(express.json()); // Allows access to req.body


// Routes //
// Get all TODO //
app.get("/todos", async(req, res) => {
    try{
        const allTodos = await pool.query("SELECT * FROM todo ORDER BY id ASC");
        res.json(allTodos.rows);
    } catch (err){
        console.error(err.message);
    }
});

// Get one todo
app.get("/todos/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);
        res.json(todo.rows[0]);
    } catch(err){
        console.error(err.message);
    }
});

// Create TODO
app.post("/todos", async (req, res) => {
    try{
        // res.json(req.body);
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]); // Spit a response
    } catch (err) {
        console.error(err.message);
    }
});

// Update TODO
app.put("/todos/:id", async (req, res) => {
    try{
        // Destructure things from req
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE id = $2", [description, id]);
        res.json("Todo was updated!");
    } catch (err){
        console.error(err.message);
    }
});

// Delete TODO
app.delete("/todos/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1", [id]);
        res.json("Todo was deleted!");
    } catch (err){
        console.error(err.message);
    }
});

// Server running on port 5000. Going to listen for requests through the port
app.listen(5000, ()=> {
    console.log("|| Server is starting on port 5000 ||")
});