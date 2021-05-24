import { Container, Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import Fan from '../item/Fan'
import Talent from '../item/Talent'
import './Home.css'

export default function Home() {
    const [toggle,setToggle]= useState(false)
    const toggleChange=(e)=>
    {
        console.log(e);
        if(e==="talent")
        {
            setToggle(true)
            document.getElementById('talent').style.backgroundColor='green'
            document.getElementById('fan').style.backgroundColor='#181818'
        }else{
            setToggle(false)
            document.getElementById('fan').style.backgroundColor='green'
            document.getElementById('talent').style.backgroundColor='#181818'
        }
    }
    return (
        <div>
            <Container maxWidth="md">
                <Grid container justify="space-between" direction="row">
                    <img src="./Fanconvo.png" alt="hari" className="imgHeader"></img>
                    <Grid item>
                        <Grid container direction="row">
                            <Typography className="signupHead" variant="body1" style={{cursor:"pointer"}}>Sign up</Typography>
                            <Typography className="signupHead" variant="body1" style={{cursor:"pointer"}}>Login</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Typography className="text-white font-weight-light" variant="h6">A marketplace for conversations,mentorships and perfomances.</Typography>
                <Grid container justify="flex-start" direction="row" alignItems="flex-end">
                    <Grid item>
                        <Typography variant="h5" className="text-white search-text">Search New Talent</Typography>
                    </Grid>
                    <Grid item >
                        <input type="text" className="input text-white" /><i className="fas fa-search ml-2 text-success"></i>
                    </Grid>
                </Grid>
                <Grid container className="insideBox" justify="center" direction="column" alignItems="center">
                    <div className="ba">
                    <ToggleButtonGroup onChange={toggleChange} className="items" name="items" >
                        <ToggleButton id="fan" selected value="fan" style={{backgroundColor:"green",border:"none"}}>
                            <Typography variant="body2">FAN SIGNUP</Typography>
                        </ToggleButton>
                        <ToggleButton id="talent" value="talent" style={{backgroundColor:"#181818",border:"none",outline:"none"}}>
                            <Typography  variant="body2">TALENT SIGNUP</Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>
                    </div>
                    {toggle===true?<Talent />:<Fan />}
                </Grid>
                <Grid container direction="row" style={{marginTop:"2em"}} justify="space-around">
                <img src="./Fanconvo.png" alt="hari" className="imgFooter" ></img>
                <Grid item style={{cursor:"pointer"}}>
                    <Typography align="center" className="text-secondary" variant="subtitle1">How Fanconvo works?</Typography>
                    <Typography align="center" className="text-secondary" variant="subtitle1">&#169; 2021 Fanconvo</Typography>
                </Grid>
                <Typography className="text-secondary" variant="subtitle1" style={{cursor:"pointer"}}>Terms of Use</Typography>
                <Typography className="text-secondary" variant="subtitle1" style={{cursor:"pointer"}}>Contact Us</Typography>
                </Grid>
            </Container>
        </div>
    )
}
