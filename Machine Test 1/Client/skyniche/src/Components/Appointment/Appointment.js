import React, { useState } from 'react'
import { Form, Modal, ModalDialog } from 'react-bootstrap'
import axios from 'axios'
import Server from '../../Server'
export default function Appointment() {
    const [timeBool, setTimeBool] = useState(false)
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [day, setDay] = useState()
    const timeSlot = (day) => {
        setDay(day)
        setTimeBool(!timeBool)
    }
    const timeSubmit = () => {
        if (endTime < startTime) {
            alert("Select Proper Time ")
        } else {
            
            let data = {
                startTime: startTime,
                endTime: endTime,
                day: day
            }
            axios.post(Server + '/addTimeSlot', data).then((response) => {
                if(response.data.slotAdded===false)
                {
                    alert("This Time Slot is not Available")
                }else{
                    alert ("Your Appointment has been Added")
                }   
            })
        }

    }
    return (
        <div>
            <h2 className="text-center text-primary">Add Appointments</h2>
            <div className="row">
            <div className="col-md-4 col-lg-3 m-3">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Sunday</h5>
                        </div>
                        <div className="card-body bg-light">
                            <button className="btn btn-primary" onClick={() => timeSlot("Sunday")}>Add Time Slot</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-lg-3 m-3">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Monday</h5>
                        </div>
                        <div className="card-body bg-light">
                            <button className="btn btn-primary" onClick={() => timeSlot("Monday")}>Add Time Slot</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-lg-3 m-3">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Tuesday</h5>
                        </div>
                        <div className="card-body bg-light">
                            <button className="btn btn-primary" onClick={() => timeSlot("Tuesday")}>Add Time Slot</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-lg-3 m-3">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Wednesday</h5>
                        </div>
                        <div className="card-body bg-light">
                            <button className="btn btn-primary" onClick={() => timeSlot("Wednesday")}>Add Time Slot</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-lg-3 m-3">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Thursday</h5>
                        </div>
                        <div className="card-body bg-light">
                            <button className="btn btn-primary" onClick={() => timeSlot("Thursday")}>Add Time Slot</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-lg-3 m-3">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Friday</h5>
                        </div>
                        <div className="card-body bg-light">
                            <button className="btn btn-primary" onClick={() => timeSlot("Friday")}>Add Time Slot</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-lg-3 m-3">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Saturday</h5>
                        </div>
                        <div className="card-body bg-light">
                            <button className="btn btn-primary" onClick={() => timeSlot("Saturday")}>Add Time Slot</button>
                        </div>
                    </div>
                </div>

            </div>
            <Modal show={timeBool} onHide={timeSlot} aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title >Add Appointment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ModalDialog>
                        <Form>
                            <label>Select Start Time</label>
                            <input type="time" name="Start" id="startTime" onChange={(event) => setStartTime(event.target.value)} className="form-control"></input>
                            <label>Select End Time</label>
                            <input type="time" name="End" id="endTime" onChange={(event) => setEndTime(event.target.value)} className="form-control"></input>
                            <input type="button" className="btn btn-primary mt-2" onClick={timeSubmit} value="Submit"></input>
                        </Form>
                    </ModalDialog>
                </Modal.Body>

            </Modal>
        </div>
    )
}
