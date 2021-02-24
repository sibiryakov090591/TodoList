import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from './EditableSpan.module.css';
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string
    onChange: (newTitleValue: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    console.log("Span")
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const activateViewMode = () => {
        if (title.trim() !== "") {
            setEditMode(false)
            props.onChange(title)
        } else {
            setEditMode(false)
            props.onChange(props.title)
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") activateViewMode()
    }

    return (
        editMode
            ? <TextField variant={"outlined"}
                         autoFocus
                         value={title}
                         onChange={onChangeHandler}
                         onBlur={activateViewMode}
                         onKeyPress={onKeyPressHandler}
            />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}
