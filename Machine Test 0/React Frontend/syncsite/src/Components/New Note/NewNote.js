import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useHistory } from 'react-router'
import Server from '../../Server'
import './NewNote.css'
export default function NewNote() {
    let history = useHistory()
    useEffect(() => {
        let token = localStorage.getItem('jwt')
        if (!token) {
            history.push('/')
        }
    }, []);
    const [note,setNote] = useState('')
    const noteSubmit=()=>
    {
        if(note.length<1)
        {
            alert("Enter The Note")
        }else{
            let data={
                note:note,
                jwt:localStorage.getItem('jwt')
            }
            document.getElementById('noteInput').value=''
            setNote('')
            axios.post(Server+'/addNewNote',data).then((response)=>
            {
                history.push('/home')
            })
        }
    }
    return (
        <div>
            <div className="row">
                <div className="newNoteBox col-md-10">
                    <h1 className="text-center text-white mb-3 pt-3">Add New Note</h1>
                    <div className="noteBox alert border-white text-center m-auto col-md-9 col-lg-7 p-3">
                        <Form>
                            <textarea rows="8" cols ="60" id="noteInput" style={{border:"none",outline:"none"}} onChange={(event)=>setNote(event.target.value)} className="p-2 m-auto"></textarea><br></br>
                            <button type="button" onClick={noteSubmit} className="btn btn-primary w-25 mt-2" >Submit</button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
