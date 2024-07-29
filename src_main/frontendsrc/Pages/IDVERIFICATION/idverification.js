import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, Button, Form, FormGroup, Col, Input } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './idverification.css';

function DetailPage0() {
    const navigate = useNavigate();

    const [username, setUsername] = React.useState('');
    const [dateofbirth, setDateofbirth] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [mismatchedFields, setMismatchedFields] = React.useState({});

    React.useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        if (userData) {
            setUsername(userData.username);
            setDateofbirth(userData.dateofbirth);
            setGender(userData.gender);
        }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'username') setUsername(value);
        if (name === 'dateofbirth') setDateofbirth(value);
        if (name === 'gender') setGender(value);

        axios.post('http://localhost:8000/api/verify-id', {
            username,
            dateofbirth,
            gender,
        }).then(response => {
            const { mismatchedFields } = response.data;
            setMismatchedFields(mismatchedFields);
        }).catch(error => {
            console.error('There was an error verifying the ID!', error);
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8000/api/verify-id', {
            username,
            dateofbirth,
            gender,
        }).then(response => {
            const { mismatchedFields } = response.data;
            setMismatchedFields(mismatchedFields);
            if (Object.keys(mismatchedFields).length === 0) {
                sessionStorage.setItem('user', JSON.stringify({ username, dateofbirth, gender }));
                navigate('/success'); // Navigate to /success
            }
        }).catch(error => {
            console.error('There was an error verifying the ID!', error);
        });
    };

    const changeGender = (newGender) => {
        setGender(newGender);
        axios.post('http://localhost:8000/api/verify-id', {
            username,
            dateofbirth,
            gender: newGender,
        }).then(response => {
            const { mismatchedFields } = response.data;
            setMismatchedFields(mismatchedFields);
        }).catch(error => {
            console.error('There was an error verifying the ID!', error);
        });
    };

    return (
        <div className="detailsEntireBlock">
            <div className="detailsCard">
                <div className="cardHeader">
                    <div className="row">
                        <div className="Icon">
                            <img src={require('./icon3.png')} height="55" width="55" alt="icon" />
                        </div>
                        <div className="cardText">
                            <div style={{ fontSize: '20px', marginBottom: '0px' }}>
                                <CardTitle className="text-left">
                                    <strong>Hi! Help us setup your account</strong>
                                </CardTitle>
                            </div>
                            <CardText className="text-left">
                                We'll verify it with your KYC documents
                            </CardText>
                        </div>
                    </div>
                </div>
                <div className="row row-content justify-content-center">
                    <div className="col-12">
                        <div className="cardBody">
                            <div className="insideCardBody">
                                <form onSubmit={handleSubmit}>
                                    <FormGroup row>
                                        <Col>
                                            <CardText className="text-color">Your full name</CardText>
                                            <Input
                                                type="text"
                                                name="username"
                                                value={username}
                                                placeholder="eg: Raj Kumar Babu"
                                                className={mismatchedFields.username ? 'is-invalid' : ''}
                                                onChange={handleChange}
                                                required
                                            />
                                            <div style={{ marginTop: '4px' }}>
                                                <CardText className="text-muted text-left">
                                                    Ensure it matches name on your ID
                                                </CardText>
                                            </div>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col>
                                            <CardText className="text-color">Your date of birth</CardText>
                                            <Input
                                                type="date"
                                                name="dateofbirth"
                                                value={dateofbirth}
                                                placeholder="DD/MM/YYYY"
                                                className={mismatchedFields.dateofbirth ? 'is-invalid' : ''}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col>
                                            <CardText className="text-color">Your gender</CardText>
                                            <div className="row">
                                                <div className="col-4">
                                                    <button
                                                        type="button"
                                                        className={`bbutton col-12 btn btn-block btn-outline-success ${gender === 'Female' ? 'active' : ''}`}
                                                        onClick={() => changeGender('Female')}
                                                    >
                                                        Female
                                                    </button>
                                                </div>
                                                <div className="col-4">
                                                    <button
                                                        type="button"
                                                        className={`bbutton RoundButton btn btn-block btn-outline-success ${gender === 'Male' ? 'active' : ''}`}
                                                        onClick={() => changeGender('Male')}
                                                    >
                                                        Male
                                                    </button>
                                                </div>
                                                <div className="col-4">
                                                    <button
                                                        type="button"
                                                        className={`bbutton RoundButton btn btn-block btn-outline-success ${gender === 'Other' ? 'active' : ''}`}
                                                        onClick={() => changeGender('Other')}
                                                    >
                                                        Other
                                                    </button>
                                                </div>
                                            </div>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Col>
                                            <div className="insidebut">
                                                <Button className="col-6" type="submit" color="success">
                                                    Continue
                                                </Button>
                                            </div>
                                        </Col>
                                    </FormGroup>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailPage0;
