import React, {Fragment, useState} from "react";

const EditTodo = ({todo}) => {

    const [description, setDescription] = useState(todo.description);

    //Edit text func
    const editText = async e => {
        e.preventDefault();
        try {
            const body = { description };
            // const res = 
            await fetch(`http://localhost:5000/todos/${todo.id}`,{
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${todo.id}`}>Edit</button>

            <div className="modal fade" id={`id${todo.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onClick={() => setDescription(todo.description)}>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit Todo</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setDescription(todo.description)}></button>
                </div>
                <div className="modal-body">
                    <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)}/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-warning" onClick={e => editText(e)}>Save</button>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => setDescription(todo.description)}>Cancel</button>
                </div>
                </div>
            </div>
            </div>
        </Fragment>
    );
}

export default EditTodo;