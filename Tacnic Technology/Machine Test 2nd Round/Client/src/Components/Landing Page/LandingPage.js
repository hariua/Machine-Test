import { Button, Container, CssBaseline, Grid, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useHistory } from 'react-router'
import Server from '../../Server'
import './LandingPage.css'
export default function LandingPage() {
    //variable for Modal Opening and Closing
    const [bool, setBool] = useState(false)
    //login input text
    const [loginMail, setLoginMail] = useState('')
    //signup input text
    const [signupMail, setSignupMail] = useState('')
    let history = useHistory()
    const modalPopup = () => {
        setBool(true)
    }
    //function executes when login button clicked
    const loginSubmit = () => {
        axios.post(Server + '/login', { mail: loginMail }).then((response) => {
            if (response.data.login === true) {
                localStorage.setItem('mail', response.data.Mail)
                history.push('/todo')
            } else {
                alert("Invalid User...")
            }
        })
        document.getElementById('loginText').value = ''
    }
    const signupSubmit = () => {
        axios.post(Server + '/signup', { mail: signupMail }).then((response) => {
            if (response.data.user === true) {
                localStorage.setItem('mail', response.data.Mail)
                history.push('/todo')
            } else {
                alert("This Email Already Exists!!!")
            }
        })
        document.getElementById('signupText').value = ''
    }
    return (
        <div>
            <CssBaseline />
            <Container maxWidth="md">
                <Typography align="center" variant="h4" className="text-white m-3">Login Page</Typography>
                <Grid className="insideBox" container justify="space-evenly" direction="column" alignItems="center">
                    <Grid item>
                        <Typography variant="body1" className="mb-3 text-white">Enter Your Mail Id</Typography>
                        <input type="text" id="loginText" className="form-control" onChange={(event) => setLoginMail(event.target.value)} name="Email" placeholder="Enter Your Email"></input>
                    </Grid>
                    <Button variant="contained" onClick={loginSubmit} className="bg-primary">Submit</Button>
                    <Button variant="text" onClick={modalPopup} className="text-white">Don't Have an Account?</Button>
                </Grid>
                <Modal show={bool} onHide={() => setBool(!bool)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Create a New Account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Enter a New Email</h4>
                        <input type="email" id="signupText" placeholder="Enter a New Mail" onChange={(event) => setSignupMail(event.target.value)} className="form-control" name="signup"></input><br></br>
                        <Button variant="contained" onClick={signupSubmit} className="bg-primary mt-2">Submit</Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="bg-info text-white" onClick={() => setBool(!bool)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    )
}
