import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Dropdown, Form, Modal, ModalDialog } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom'
import Server from '../../Server';
import './Home.css'
export default function Home() {
    let history = useHistory()
    const [notes, setNotes] = useState([])
    const [editNote,setEditNote] = useState()
    const [editNoteId,setEditNoteId] = useState()
    const [noteBool, setNoteBool] = useState(false)
    const [editBool, setEditBool] = useState(false)
    const [del,setDel] = useState(false)
    useEffect(() => {
        let token = localStorage.getItem('jwt')
        if (!token) {
            history.push('/')
        } else {
            let data = {
                jwt: token
            }
            axios.post(Server + '/getAllNotes', data).then((response) => {
                console.log(response);
                if (response.data.length > 0) {
                    setNotes(response.data)
                }
            })
        }
    }, [editBool,del]);
    const logout = () => {
        history.push('/')
        localStorage.removeItem('jwt')
    }
    const noteDisplayOn = (index) => {
        let psd = prompt("Enter Your Password Please")
        if (psd != null) {
            if (psd.length > 0) {
                let data = {
                    password: psd,
                    jwt: localStorage.getItem('jwt')
                }
                axios.post(Server + '/userAuth', data).then((response) => {
                    if (response.data.verified === true) {
                        setNoteBool(true)
                        if(notes[index].note)
                        {
                            document.getElementById('noteText').innerHTML = notes[index].note
                        }else{
                            document.getElementById('noteText').innerHTML = notes[index].Note
                        }
                        
                    } else {
                        alert("You have entered an Invalid Password")
                    }
                })
            } else {
                alert("Enter Your Password")
            }
        }

    }
    const noteDisplayOff = () => {
        setNoteBool(false)
        setEditBool(false)
    }
    const editNotes = (id) => {
        let psd = prompt("Enter Your Password Please")
        if (psd != null) {
            if (psd.length > 0) {
                let data = {
                    password: psd,
                    jwt: localStorage.getItem('jwt'),
                    id: id
                }
                axios.post(Server + '/editNote', data).then((response) => {
                    if (response.data.verified === true) {
                        setEditNote(response.data.note.note)
                        setEditBool(true)
                        setEditNoteId(id)
                    } else {
                        alert("You have entered an Invalid Password")
                    }
                })
            } else {
                alert("Enter Your Password")
            }
        }
    }
    const editSubmit=()=>
    {
        if(editNote.length>0)
        {
            let data={
                editNote:editNote,
                jwt:localStorage.getItem('jwt'),
                id:editNoteId
            }
            axios.post(Server+'/updateNote',data).then((response)=>
            {
                if(response.data==="updated")
                {
                    setEditBool(false)
                    alert("Note Has been Updated")
                }
            })
        }
    }
    const deleteNote = (id) => {
        let psd = prompt("Enter Your Password Please")
        if (psd != null) {
            if (psd.length > 0) {
                let data = {
                    password:psd,
                    jwt: localStorage.getItem('jwt'),
                    id: id
                }
                axios.post(Server + '/deleteNote', data).then((response) => {
                    if (response.data.verified === true) {
                        setDel(!del)
                        alert("Note has been deleted Successfully")
                    } else {
                        alert("You have entered an Invalid Password")
                    }
                })
            } else {
                alert("Enter Your Password")
            }
        }
    }
    return (
        <div>
            <div className="row">
                <div className="homeBox col-md-10">
                    <button onClick={logout} className="btn btn-danger float-right m-2">Logout</button>
                    <h1 className="text-center text-white p-2">Welcome Home</h1>
                    <Link to="/addNewNote"><button className="btn btn-primary">Add New Note</button></Link>
                    <div className="row p-5">
                        {notes.length > 0 ? notes.map((data, index) => {
                            return (
                                <div className="col-md-3 mb-3">
                                    <div className="card bg-light">
                                        <div className="card-header">
                                            <div className="" style={{ padding: "0px" }}>

                                                <Dropdown>
                                                    <Dropdown.Toggle id="dropdown-basic" variant="sm" className="float-right"  >
                                                        <span className="fas fa-ellipsis-v float-right " ></span>
                                                    </Dropdown.Toggle >

                                                    <Dropdown.Menu align="right">
                                                        <Dropdown.Item
                                                            onClick={() => editNotes(data._id)}
                                                        >Edit Note</Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={() => deleteNote(data._id)}
                                                        >Delete Note</Dropdown.Item>

                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                        <p className="card-text text-center" style={{ cursor: "pointer" }} onClick={() => noteDisplayOn(index)}>Note {index + 1}</p>
                                    </div>
                                </div>
                            )
                        }) : <div></div>}

                    </div>
                </div>
                <Modal show={noteBool} onHide={noteDisplayOff} aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title >Note</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ModalDialog><p id="noteText"></p></ModalDialog>
                    </Modal.Body>

                </Modal>
                <Modal show={editBool} onHide={noteDisplayOff} aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title >Edit Note</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ModalDialog>
                        <Form>
                            <textarea rows="8" cols ="60" id="editInput" style={{border:"none",outline:"none"}} value={editNote} onChange={(event)=>setEditNote(event.target.value)} className="p-2 m-auto"></textarea><br></br>
                            <button type="button" onClick={editSubmit} className="btn btn-primary w-25 mt-2 text-center"  >Submit</button>
                        </Form>
                        </ModalDialog>
                    </Modal.Body>

                </Modal>
            </div>
        </div>
    )
}
