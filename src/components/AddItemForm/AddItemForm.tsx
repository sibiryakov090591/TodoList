import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from './AddItemForm.module.css';


type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<PropsType> = (props) => {

    const [error, setError] = useState<string | null>(null)
    const [title, setTitle] = useState("")

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle("")
        } else {
            setError("Title is required!")
        }
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") addItem()
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? styles.error : ""}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    )
}