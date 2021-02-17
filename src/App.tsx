import React, {useCallback} from 'react';
import './App.css';
import ToDoList from "./components/TodoList/ToDoList";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import {AppBar, IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from "./todolists-reducer/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC
} from "./todolists-reducer/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./todolists-reducer/store";

export type TodoListType = {
    id: string
    title: string
    filter: string
}

export type TasksType = {
    [key: string]: TaskType[]
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((deleteId: string, todoListId: string) => {
        dispatch(removeTaskAC(deleteId, todoListId))
    }, [])

    const removeTodoList = useCallback((deleteId: string) => {
        dispatch(removeTodoListAC(deleteId))
    }, [])

    const changeFilter = useCallback((filterValue: FilterValuesType, todoListId: string) => {
        dispatch(changeTodoListFilterAC(filterValue, todoListId))
    }, [])

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }, [])

    const changeTaskStatus = useCallback((id: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todoListId))
    }, [])

    const onChangeTodoListTitle = useCallback((newTitle: string, todoListId: string) => {
        dispatch(changeTodoListTitleAC(newTitle, todoListId))
    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
    }, [])

    const changeTaskTitle = useCallback((newTitleValue: string, taskId: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitleValue, todoListId))
    }, [])

    const mapTodoLists = todoLists.map(tl => {

        const allTodoListTasks = tasks[tl.id];

        return (
            <Grid item>
                <Paper style={{padding: "10px"}}>
                    <ToDoList key={tl.id}
                              todoListId={tl.id}
                              title={tl.title}
                              tasks={allTodoListTasks}
                              removeTask={removeTask}
                              removeTodoList={removeTodoList}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              filter={tl.filter}
                              changeTaskTitle={changeTaskTitle}
                              changeListTitle={onChangeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container spacing={3} alignItems={"stretch"}>
                    {mapTodoLists}
                </Grid>
            </Container>
        </div>
    )
}

export default App
