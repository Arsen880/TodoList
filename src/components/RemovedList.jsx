import React from 'react';

function RemovedList ({restore, removedItems, deleteItem}) {
    const btn = {
        color: "white",
        backgroundColor: "black",
        borderRadius: "5px",
        height: "20px",
        width: "60px",
        cursor: "pointer",
        marginRight: "5px"
    }
    const listContainer = {
        display: "flex",
        alignItems: "center",
        border: "1px solid grey",
        borderRadius: "10px",
        height: "30px",
        marginTop: "10px"
        
    }
    return ( 
        <div>
        {removedItems.map((todo , index) => {
            return (
                <div style={listContainer}  key={`todo-${index}`}>
                    <p style={{fontSize:"24px", margin:"0", flex:"1 0 auto"}}>{todo.text}</p>
                    <button style={btn} onClick={()=>restore(index)}>Restore</button>
                    <button style={btn} onClick={()=>deleteItem(index)}>Delete</button>
                </div>
            )
            }
        )}
    </div>
     );
}

export default RemovedList ;