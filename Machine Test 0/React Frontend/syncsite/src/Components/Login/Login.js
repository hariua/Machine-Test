import React, { useEffect, useState } from 'react'
import "./Login.css"
import axios from 'axios'
import {Form} from 'react-bootstrap'
import Server from '../../Server';
import { useHistory } from 'react-router';



export default function Login() {
    let history = useHistory()
    const loginSubmit = ()=>
    {
        if(name.length<1 || password.length<1 )
        {
            alert("Please Enter the Credentials")
        }else{
            let data={
                User:name,
                Password:password
            }
            setName('')
            setPassword('')
            document.getElementById('userInput').value=""
            document.getElementById('psdInput').value=""
            axios.post(Server+'/login',data).then((response)=>
            {
                if(response.data.login===true)
                {
                    localStorage.setItem('jwt',response.data.jwt)
                    history.push('/home')
                }else{
                    alert("login failure")
                }
            })
        }
       
    }
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    return (
        <div>
            <div className="row">
                <div className="loginForm col-md-6 col-lg-4">
                    <h2 className="text-center pb-3">Login</h2>
                    <Form>
                        <label>Enter the User Name :</label>
                        <input className="form-control" id="userInput" type = "text" onChange={(event)=>setName(event.target.value)} name="Name"></input>
                        <label className="pt-3">Enter your Password :</label>
                        <input className="form-control" id="psdInput" type = "password" onChange={(event)=>setPassword(event.target.value)} name = "Password"></input>
                        <input type = "button" onClick={loginSubmit} className=" btn btn-primary w-100 mt-3" value="Submit"></input>
                    </Form>
                </div>
            </div>
        </div>
    )
}
