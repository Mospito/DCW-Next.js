import { useState, useEffect } from 'react'
import styles from '../styles/Todo.module.css'

const Todo = () => {


    const [tasks, setTasks] = useState([])

    // const [tasks, setTasks] = useState(
    //     [
    //         { id: 1, name: 'Reading a book' },
    //         { id: 2, name: 'Sleep at night' }
    //     ])

    const [name, setName] = useState('');
    const [idEdit, setIdEdit] = useState(0);

    useEffect( async () => {
        let ts = await getTasks();
        console.log(ts)
        setTasks(ts) 
    }, [] )
 



    // let tasks = [
    //     { id: 1, name: 'Do homework' },
    //     { id: 2, name: 'Read book' }]
    const renderTask = () => {
        if (tasks.length != 0) {
            return tasks.map(
                (task, index) => {
                    return (
                        <li key={index} className={styles.listItem}>
                            <div>
                                {index + 1}
                                {(+idEdit !== +task.id) ?
                                    task.name :
                                    <input
                                        className={styles.btnAdd}
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                }
                                <button onClick={() => editTask(task.id, task.name)} className={styles.btnEdit}>Edit</button>
                                <button onClick={() => deleteTask(task.id)} className={styles.btnDelete}>Delete</button>
                            </div>

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
    const getTasks = async () => {
        const res = await fetch('http://localhost:8000/')
        const json = await res.json()
        console.log(json)
        return json;
     }

     Todo.getInitialProps = async (ctx) => {
        const res = await fetch('https://api.github.com/users/wwarodom')
        const json = await res.json()
        return { login: json.login, avatar_url: json.avatar_url }
     }
     
     



    const addTask = (name) => {
        console.log('Add!');
        // tasks.push({ id: 3, name: 'xxxxx' })
        const id = tasks[tasks.length - 1].id + 1;
        console.log("Task: ", tasks);
        if (tasks.length <= 9 && name.trim() != "")
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