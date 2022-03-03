import  React, { useState, useEffect, useRef } from 'react';
import TodoCreator from "./FormInput";
import TodoList from "./List";
import RemovedList from './RemovedList';
import { createMuiTheme } from "@material-ui/core/styles";


const theme = createMuiTheme({
    palette: {
        primary: { main: '#000000' },
    },
});

const Form = () => {

    const [ newTodo, setNewTodo ] = useState('');
    const [ todos, setTodos ] = useState([]);
    const inputRef = useRef();
    const noteRef = useRef({});
    const [ isInputEmpty, setInputEmpty ] = useState(false)
    const [ removedItems, setRemovedItems ] = useState([])


    const handleSubmit = e => {
        e.preventDefault();
        addTodo(newTodo);
        clearInput();
        inputRef.current.focus();
    };

    const preventSubmit = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const addTodo = text => {
        if ( text !== '') {
            const newTodos = [...todos, { text }]
            setNewTodo('')
            setTodos(newTodos);
        } else {
            setInputEmpty(true);
        }
    };

    const removeTodo = index => {
        setRemovedItems([...removedItems, todos[index]])

        const newArr = [...todos]
        newArr.splice(index, 1)
        setTodos(newArr)   
    }

    const restore = index => {
        setTodos([...todos, removedItems[index]])

        const newArr = [...removedItems]
        newArr.splice(index,1)
        setRemovedItems(newArr)
    }

    const deleteItem = index => {
        const newArr = [...removedItems]
        newArr.splice(index,1)
        setRemovedItems(newArr)
    }

    const completeTodo = index => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos);
    };

    const editTodo = index => {
        const newTodos = [...todos];
        newTodos[index].isEditing = !newTodos[index].isEditing;
        setTodos(newTodos);
    }

    const saveTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].isEditing = !newTodos[index].isEditing;
        newTodos[index].text = noteRef.current[index].value;
        setTodos(newTodos);
    }

    const clearInput = () => {
        setNewTodo('');
    }

    const setTodo = todo => {
        setInputEmpty(false);
        setNewTodo(todo);
    }

    useEffect(() => {

    }, [todos])

    return (
        <form onSubmit={handleSubmit} className="form">

                <TodoCreator
                    theme={theme}
                    todo={newTodo}
                    setTodo={setTodo}
                    clearInput={clearInput}
                    inputRef={inputRef}
                    isInputEmpty={isInputEmpty}
                    preventSubmit={preventSubmit}
                />

                <TodoList
                    theme={theme}
                    todos={todos}
                    completeTodo={completeTodo}
                    editTodo={editTodo}
                    deleteTodo={removeTodo}
                    saveTodo={saveTodo}
                    noteRef={noteRef}
                    preventSubmit={preventSubmit}
                />

                <RemovedList
                    removedItems={removedItems}
                    restore={restore}
                    deleteItem={deleteItem}
                />
            </form>
    )
}

export default Form;