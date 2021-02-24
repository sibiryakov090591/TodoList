import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {

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

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === "Enter") addItem()
    }

    return (
        <div>
            <TextField variant={"outlined"}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
                       label={"Title"}
            />
            <IconButton onClick={addItem}
                        color={"primary"}>
                <AddBox/>
            </IconButton>
        </div>
    )
}

export default React.memo(AddItemForm)