import { Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { Form } from 'react-bootstrap'
import './Item.css'

export default function Talent() {
    return (
        <div>
            <Container>
                <Grid container alignItems="center" direction="column">
                <Typography variant="h4" className="text-white">Create Your Talent Account</Typography>
                <Form>
                    <label className="label">First Name *</label><br></br>
                    <input type="text" placeholder="First Name" className="input text-white" name="First Name"></input><br></br>
                
                    <label className="label">Last Name *</label><br></br>
                    <input type="text" placeholder="Last Name" className="input text-white" name="Last Name"></input><br></br>
               
                    <label className="label">User Name *</label><br></br>
                    <input type="text" placeholder="User Name" className="input text-white" name="User Name"></input><br></br>
                
                    <label className="label">Email *</label><br></br>
                    <input type="email" placeholder="Email" className="input text-white" name="Email"></input><br></br>

                    <label className="label">Timezone *</label><br></br>
                    <select name="timezone" className="input text-white">
                        <option value="a"  selected>PST8PDT - 6:20 AM</option>
                        <option value="b">PST8PDT - 7:40 AM</option>
                        <option value="c">PST8PDT - 8:50 AM</option>
                    </select><br></br>

                    <label className="label">Password *</label><br></br>
                    <input type="password" placeholder="Password" className="input text-white" name="Password"></input><br></br>

                    <Grid container alignItems="center" direction="column">
                    <Grid item>
                    <input type="checkbox" className="input text-success mt-5"></input><span className="text-white pl-2">I agree to the <span className="text-success">Terms and Conditions</span></span><br></br>
                    </Grid>
                    <input type="button" className="btn btn-success signup mt-3" value="SIGN UP"></input><br></br>
                    <p className="text-white">Already have an Account? <span className="text-success" style={{cursor:"pointer"}}>Login</span></p>
                    </Grid>
                </Form>
                </Grid>
            </Container>
        </div>
    )
}
