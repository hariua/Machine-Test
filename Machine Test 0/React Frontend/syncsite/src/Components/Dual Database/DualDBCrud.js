import { Button, Container, CssBaseline, Grid, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Modal, Table } from 'react-bootstrap'
import Server from '../../Server'
import './Component.css'
export default function DualDBCrud() {
    const [modalBool, setModalBool] = useState(false)
    const [editBool, setEditBool] = useState(false)
    const [delBool, setDelBool] = useState(false)

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [place, setPlace] = useState('')

    const [mongoData, setMongoData] = useState([])
    const [sqlData, setSqlData] = useState([])


    useEffect(() => {
        axios.get(Server + '/getAllNotes').then((response) => {
            if (response.data.mongo.length > 0) {
                setMongoData(response.data.mongo)
            }
            if (response.data.sql.length > 0) {
                setSqlData(response.data.sql)
            }

        })
    }, [modalBool,editBool,delBool])

    const createData = () => {
        if (name.length > 0 && age.length > 0 && place.length > 0) {
            let data = {
                Name: name,
                Age: age,
                Place: place
            }
            axios.post(Server + '/addNewNote', data).then((response) => {
                if (response.data.note === true) {
                    setModalBool(!modalBool)
                }
            })
            document.getElementById('name').value = ''
            document.getElementById('age').value = ''
            document.getElementById('place').value = ''
        } else {
            alert("Enter All Details")
        }
    }
    const editData = (id)=>
    {
        axios.post(Server+'/editNote',{id:id}).then((response)=>
        {
            setEditBool(!editBool)
            setName(response.data.note.Name)
            setAge(response.data.note.Age)
            setPlace(response.data.note.Place)
            document.getElementById('editId').value=response.data.note._id
            document.getElementById('editName').value=response.data.note.Name
            document.getElementById('editAge').value=response.data.note.Age
            document.getElementById('editPlace').value=response.data.note.Place
            
        })
    }
    const editDataSubmit = ()=>
    {
        let data={
            _id:document.getElementById('editId').value,
            Name:name,
            Age:age,
            Place:place
        }
        axios.post(Server+'/updateNote',data).then((response)=>
        {
            if(response.data==="updated")
            {
                setEditBool(!editBool)
            }
        })
    }
    const deleteData = (id)=>
    {
        axios.post(Server+'/deleteNote',{id:id}).then((response)=>
        {
            setDelBool(!delBool)
        })
    }
    return (
        <div>
            <CssBaseline />
            <Typography variant="h4" className="text-white text-center p-2">CRUD Operations Using two Databases</Typography>
            <Container className="containerBox" maxWidth="lg">
                <Button variant="contained" color="secondary" className="m-2" onClick={() => setModalBool(!modalBool)}>Add New Data</Button>
                <Grid container direction="row" justify="space-between" >
                    <Grid item className="gridItem mt-2">
                        <Typography variant="h6" align="center" className="text-white">MongoDB</Typography>
                        {mongoData.length > 0 ? mongoData.map((data, index) => {
                            return (
                                <Grid key={index} container direction="row" alignItems="center" justify="space-between" className="mongoItem">
                                    <ul className="text-white" style={{ listStyle: "none", paddingTop: "2%" }}>
                                        <li>{"Name : " + data.Name} </li>
                                        <li>{"Age : " + data.Age}</li>
                                        <li>{"Place : " + data.Place}</li>
                                    </ul>
                                    <Grid item>
                                        <Grid container direction="row" justify="space-evenly">
                                            <Button onClick={()=>editData(data._id)} className="bg-primary text-white btn m-1">Edit</Button>
                                            <Button onClick={()=>deleteData(data._id)} className="bg-danger text-white btn m-1">X</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                        }) : <div></div>}
                    </Grid>
                    <Grid item className="gridItem mt-2">
                        <Typography variant="h6" align="center" className="text-white">PostgreSQL</Typography>
                        <Table className="text-white" striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Place</th>
                                    <th>Age</th>
                                    <th>Edit</th>
                                    <th>Dlt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sqlData.length>0?sqlData.map((data,index)=>
                                {
                                    return(
                                        <tr>
                                    <td>{index+1}</td>
                                    <td>{data.Name}</td>
                                    <td>{data.Place}</td>
                                    <td>{data.Age}</td>
                                    <td><Button onClick={()=>editData(data._id)} className="bg-primary text-white btn m-1">Edit</Button></td>
                                    <td><Button onClick={()=>deleteData(data._id)} className="bg-danger text-white btn m-1">X</Button></td>
                                </tr>
                                    )
                                }):<div></div>}
                            </tbody>
                        </Table>
                    </Grid>
                </Grid>
            </Container>
            <Modal show={modalBool} onHide={() => setModalBool(!modalBool)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add a New Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label for="name">Name :</label>
                    <input type="text" id="name" onChange={(e) => setName(e.target.value)} placeholder="Enter the Name" className="form-control" name="name"></input><br></br>
                    <label for="age">Age :</label>
                    <input type="number" id="age" onChange={(e) => setAge(e.target.value)} placeholder="Enter the age" className="form-control" name="age"></input><br></br>
                    <label for="place">Place :</label>
                    <input type="text" id="place" onChange={(e) => setPlace(e.target.value)} placeholder="Enter the Place" className="form-control" name="place"></input><br></br>
                    <Button variant="contained" onClick={createData} className="bg-primary mt-2">Submit</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="bg-info text-white" onClick={() => setModalBool(!modalBool)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={editBool} onHide={() => setEditBool(!editBool)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <input type="hidden" id="editId" className="form-control" name="id"></input>
                    <label for="editName">Name :</label>
                    <input type="text" id="editName" onChange={(e) => setName(e.target.value)} placeholder="Enter the Name" className="form-control" name="name"></input><br></br>
                    <label for="editAge">Age :</label>
                    <input type="number" id="editAge" onChange={(e) => setAge(e.target.value)} placeholder="Enter the age" className="form-control" name="age"></input><br></br>
                    <label for="editPlace">Place :</label>
                    <input type="text" id="editPlace" onChange={(e) => setPlace(e.target.value)} placeholder="Enter the Place" className="form-control" name="place"></input><br></br>
                    <Button variant="contained" onClick={editDataSubmit} className="bg-primary mt-2">Submit</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="bg-info text-white" onClick={() => setEditBool(!editBool)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
