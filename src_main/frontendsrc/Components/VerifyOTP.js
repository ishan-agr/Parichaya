import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const VerifyOTP = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    const handleVerifyOTP = async () => {
        const response = await axios.post('http://localhost:8000/api/verify-otp/', { email, otp });
        if (response.data.message === 'OTP verified') {
            alert('OTP verified successfully');
        } else {
            alert('Invalid OTP');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Verify OTP</Typography>
            <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="OTP"
                variant="outlined"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button onClick={handleVerifyOTP} variant="contained" color="primary">Verify OTP</Button>
        </Container>
    );
};

export default VerifyOTP;
