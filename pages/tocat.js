import { useState, useEffect } from 'react'
import styles from '../styles/Tocat.module.css'

const Tocat = () => {


    const [cats, setCats] = useState([])

    // const [cats, setCats] = useState(
    //     [
    //         { id: 1, name: 'Reading a book' },
    //         { id: 2, name: 'Sleep at night' }
    //     ])

    const [name, setName] = useState('');
    const [idEdit, setIdEdit] = useState(0);

    useEffect( async () => {
        let ts = await getCats();
        console.log(ts)
        setCats(ts) 
    }, [] )
 



    // let cats = [
    //     { id: 1, name: 'Do homework' },
    //     { id: 2, name: 'Read book' }]
    const renderCat = () => {
        if (cats.length != 0) {
            return cats.map(
                (cat, index) => {
                    return (
                        <li key={index} className={styles.listItem}>
                            <div>
                                {"No. "}
                                {index + 1 + " "}
                                {"Age: "+ cat.age}
                                {" Name: "}
                                {(+idEdit !== +cat.id) ?
                                    cat.name :
                                    <input
                                        className={styles.btnAdd}
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                }
                                <button onClick={() => editCat(cat.id, cat.name)} className={styles.btnEdit}>Edit</button>
                                <button onClick={() => deleteCat(cat.id)} className={styles.btnDelete}>Delete</button>
                            </div>

                        </li>)
                });
        }
        else {
            <h1>No cat!</h1>
        }

    }

    const editCat = (id) => {
        console.log("Edit Cat! ", id);
        setIdEdit(id)
        let t = cats.find((cat) => +cat.id === +id) // find ID Edit
        setName(t.name)
        if (+idEdit === +id) {
            let newCats = cats.map((cat, index) => {
                if (+cat.id === +id) {
                    cats[index].name = name
                }
                return cat;
            })
            setCats(newCats);
            setIdEdit(0);
        }

    }

    const deleteCat = (id) => {
        console.log('Delete ');
        let newCats = cats.filter((cat) => (+cat.id !== +id)) //Convert to integer
        setCats(newCats);

    }
    const getCats = async () => {
        const res = await fetch('http://localhost:8000/')
        const json = await res.json()
        console.log(json)
        return json;
     }

     Tocat.getInitialProps = async (ctx) => {
        const res = await fetch('https://api.github.com/users/wwarocatm')
        const json = await res.json()
        return { login: json.login, avatar_url: json.avatar_url }
     }
     
     



    const addCat = (name) => {
        console.log('Add!');
        // cats.push({ id: 3, name: 'xxxxx' })
        const id = cats[cats.length - 1].id + 1;
        console.log("Cat: ", cats);
        if (cats.length <= 9 && name.trim() != "")
            setCats([...cats, { id, name }]) //setState
    }

    return (
        <div className={styles.container}>
            <div className={styles.list}>
                <div className={styles.listItem}>
                    <div>
                        <h1>Tocat</h1>
                        <input type="text" onChange={(e) => setName(e.target.value)} />
                        <button onClick={() => addCat(name)}>Add</button>
                        <ul>
                            {renderCat()}
                        </ul>
                    </div>

                </div>

            </div>

            {/* {cats.map((cats) => <ul>{cats.id}{cats.name}</ul>)} */}
        </div>


        // <div>
        //     <h1>Tocat</h1>
        //     {cats.map((cat) => <li>{cat.id}{cat.name}</li>)}
        // </div>
    )
}

export default Tocat