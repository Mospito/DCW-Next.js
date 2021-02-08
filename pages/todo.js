import { useState } from 'react'
import styles from '../styles/Todo.module.css'

const Todo = () => {

    const [tasks, setTasks] = useState(
        [
            { id: 1, name: 'Reading a book' },
            { id: 2, name: 'Sleep at night' }
        ])

    const [name, setName] = useState('');
    const [idEdit, setIdEdit] = useState(0);



    // let tasks = [
    //     { id: 1, name: 'Do homework' },
    //     { id: 2, name: 'Read book' }]
    const renderTask = () => {
        if (tasks.length != 0) {
            return tasks.map(
                (task, index) => {
                    return (
                        <li key={index}>
                            {task.id}
                            {(+idEdit !== +task.id) ?
                                task.name :
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            }
                            <button onClick={() => editTask(task.id, task.name)}>Edit</button>
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                        </li>)
                });
        }
        else {
            <h1>No task!</h1>
        }

    }

    const editTask = (id) => {
        console.log("Edit Task! ", id);
        setIdEdit(id)
        let t = tasks.find((task) => +task.id === +id) // find ID Edit
        setName(t.name)
        if (+idEdit === +id) {
            let newTasks = tasks.map((task, index) => {
                if (+task.id === +id) {
                    tasks[index].name = name
                }
                return task;
            })
            setTasks(newTasks);
            setIdEdit(0);
        }

    }

    const deleteTask = (id) => {
        console.log('Delete ');
        let newTasks = tasks.filter((task) => (+task.id !== +id)) //Convert to integer
        setTasks(newTasks);

    }





    const addTask = (name) => {
        console.log('Add!');
        // tasks.push({ id: 3, name: 'xxxxx' })
        const id = tasks[tasks.length - 1].id + 1;
        console.log("Task: ", tasks);
        setTasks([...tasks, { id, name }]) //setState
    }

    return (
        <div className={styles.container}>
            <div className={styles.list}>
                <div className={styles.listItem}>
                    <div>
                        <h1>Todo</h1>
                        <input type="text" onChange={(e) => setName(e.target.value)} />
                        <button onClick={() => addTask(name)}>Add</button>
                        <ul>
                            {renderTask()}
                        </ul>
                    </div>

                </div>

            </div>

            {/* {tasks.map((tasks) => <ul>{tasks.id}{tasks.name}</ul>)} */}
        </div>


        // <div>
        //     <h1>Todo</h1>
        //     {tasks.map((task) => <li>{task.id}{task.name}</li>)}
        // </div>
    )
}

export default Todo