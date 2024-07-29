import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const SendOTP = () => {
    const [email, setEmail] = useState('');

    const handleSendOTP = async () => {
        await axios.post('http://localhost:8000/api/send-otp/', { email });
        alert('OTP sent to your email');
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Send OTP</Typography>
            <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button onClick={handleSendOTP} variant="contained" color="primary">Send OTP</Button>
        </Container>
    );
};

export default SendOTP;
