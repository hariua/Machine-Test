import { Button, Container, CssBaseline, Grid, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Server from '../../Server'
import '../Landing Page/LandingPage.css'
export default function TodoList() {
    //Array stores the list items coming from database
    const [todoArray, setTodoArray] = useState([])
    //variable for storing input text for list
    const [todoInput, setTodoInput] = useState('')
    const [bool, setBool] = useState(false)
    useEffect(() => {
        let mailId = localStorage.getItem('mail')
        axios.post(Server + '/getList', { Mail: mailId }).then((response) => {
            console.log(response);
            if (response.data.List.length > 0) {
                setTodoArray(response.data.List)
            }
        })
    }, [bool])
    //function for deleting an item from list
    const deleteItem = (id) => {
        let data = {
            Mail: localStorage.getItem('mail'),
            listId: id
        }
        axios.post(Server + '/deleteItem', data).then((response) => {
            if (response.data.delete === true) {
                setBool(!bool)
                alert("Item Deleted Successfully")
            }
        })
    }
    //function for submitting a new item to list
    const todoSubmit = () => {
        let data = {
            Mail: localStorage.getItem('mail'),
            list: todoInput
        }
        axios.post(Server + '/addToList', data).then((response) => {
            if (response.data.add === true) {
                setBool(!bool)
            }
        })
        document.getElementById('input').value = ""
    }
    return (
        <div>
            <CssBaseline />
            <Container maxWidth="md">
                <Typography variant="h4" className="text-white text-center mt-3">My Todo List</Typography>
                <Typography variant="h6" className="text-white m-2">{localStorage.getItem('mail')}</Typography>
                <Grid container className="insideBox" direction="row" justify="space-evenly" alignItems="center">
                    <Grid item className="m-3">
                        <label>Enter the Note to be added</label>
                        <input type="text" id="input" name="todo" placeholder="Enter The Text" onChange={(e) => setTodoInput(e.target.value)} className="form-control"></input>
                        <Button className="bg-primary w-100 text-white mt-2 " onClick={todoSubmit}>Submit</Button>
                    </Grid>
                    <vr className="separator"></vr>
                    <Grid item className="todoOuter">
                        {todoArray.length > 0 ? todoArray.map((data, index) => {
                            return (
                                <p className="todoItem m-2 p-1">{data.item}<span className="float-right text-white" onClick={() => deleteItem(data._id)} style={{ cursor: "pointer" }}>X</span></p>
                            )
                        }) : <div></div>}
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
