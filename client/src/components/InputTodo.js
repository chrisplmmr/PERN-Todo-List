import React, { Fragment, useState} from "react";

const InputTodo = () =>{

    const [description, setDescription] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault(); // Makes page not refresh on submit
        if(description === ""){
            alert("Cannot submit blank item.\nPlease try again");
            return; 
        }
        try{
            const body = { description }; // Uses our useState
            // const res = 
            await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (err){
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center my-5">Input Todo</h1>
            <form className="d-flex" onSubmit={onSubmitForm}>
                <input type="text" placeholder="Add Item" className="form-control" value={description} onChange={e => setDescription(e.target.value)}/>
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    );
}

export default InputTodo;