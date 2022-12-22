import React, { Fragment, useState, useEffect} from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {

    // List of todos from our DB. Set the todos array by setTodos()
    const [todos, setTodos] = useState([]);

    // Delete todo item function
    const deleteTodo = async id => {
        try{

            // Call rest delete on the todo with matching i
            // const res = 
            await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });
            
            // Reset todo list. Kickout deleted item.
            setTodos(todos.filter(todo => todo.id !== id));

        } catch(err) {
            console.error(err.message);
        }

    }

    // Get all todos with get req
    // Fetch them from the server, build an array of todo items
    // Set the state of todos var in useState() with setTodos func
    // Default state of useState is [] (ie. empty array)
    async function getTodos(){
        const res = await fetch("http://localhost:5000/todos");
        const todoArray = await res.json();
        setTodos(todoArray);
    }

    // Not sure what use effect does right now
    // Runs the time the page loads?
    useEffect(() => {
        getTodos();
    }, []);

    return (
        <Fragment>
            <h1 className="text-center my-5">List Todo Items</h1>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Description</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map(todo => (
                            <tr key={todo.id}>
                                <td>{todo.id}</td>
                                <td>{todo.description}</td>
                                <td><EditTodo todo={todo}/></td>
                                <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </Fragment>
    );
}

export default ListTodos;