import {TasksStateType} from "../App";
import {v1} from "uuid";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    id: string
    todolistId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    isDone: boolean
    todolistId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    id: string
    newTitle: string
    todolistId: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state, [action.todolistId]:
                    state[action.todolistId].filter(task => task.id !== action.id)
            }
        case 'ADD-TASK':
            return {
                ...state, [action.todolistId]:
                    [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: {
                    ...state[action.todolistId].map(task => task.id === action.id ? {
                        ...task,
                        isDone: action.isDone
                    } : task)
                }
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: {
                    ...state[action.todolistId].map(task => task.id === action.id ? {
                        ...task,
                        title: action.newTitle
                    } : task)
                }
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolistId]: []}
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', id, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', id, isDone, todolistId}
}

export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', id, newTitle, todolistId}
}

export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}

