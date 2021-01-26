import React, {useState} from 'react';
import './App.css';
import ToDoList from "./components/TodoList/ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

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

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {
            id: todoListId1,
            title: "What to learn",
            filter: "all"
        },
        {
            id: todoListId2,
            title: "What to buy",
            filter: "all"
        }
    ])

    const [tasks, setTasks] = useState<TasksType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Juice", isDone: true},
            {id: v1(), title: "Chocolate", isDone: false}
        ]
    })

    function removeTask(deleteId: string, todoListId: string) {
        let todoListTasks = [...tasks[todoListId]].filter(item => item.id !== deleteId)
        setTasks({...tasks, [todoListId]: todoListTasks})
    }

    function removeTodoList(deleteId: string) {
        setTodoLists(todoLists.filter(item => item.id !== deleteId))
        delete tasks[deleteId]
        setTasks({...tasks})
    }

    function changeFilter(filterValue: FilterValuesType, todoListId: string) {
        let todolist = todoLists.find(tl => tl.id === todoListId)
        if (todolist) {
            todolist.filter = filterValue
            setTodoLists([...todoLists])
        }
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false}
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = [task, ...todoListTasks]
        setTasks({...tasks})
    }

    function changeTaskStatus(id: string, isDone: boolean, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        let task = todoListTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    const onChangeTodoListTitle = (newTitle: string, todoListId: string) => {
        const copyTodoLists = [...todoLists]
        const list = copyTodoLists.find(i => i.id === todoListId)
        if (list) list.title = newTitle
        setTodoLists(copyTodoLists)
    }

    const addTodoList = (title: string) => {
        const newTodoList: TodoListType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodoLists([newTodoList, ...todoLists])
        setTasks({[newTodoList.id]: [], ...tasks})
    }

    const mapTodoLists = todoLists.map(tl => {
        const allTodoListTasks = tasks[tl.id]
        let tasksForToDoList = tasks[tl.id];
        if (tl.filter === "active") {
            tasksForToDoList = allTodoListTasks.filter(t => !t.isDone)
        }
        if (tl.filter === "completed") {
            tasksForToDoList = allTodoListTasks.filter(t => t.isDone)
        }

        const changeTaskTitle = (newTitleValue: string, taskId: string) => {
            const copy = {...tasks}
            const task = copy[tl.id].find(i => i.id === taskId)
            if (task) task.title = newTitleValue
            setTasks(copy)
        }

        return (
            <Grid item>
                <Paper style={{padding: "10px"}}>
                    <ToDoList key={tl.id}
                              id={tl.id}
                              title={tl.title}
                              tasks={tasksForToDoList}
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
