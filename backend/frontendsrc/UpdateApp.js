import React from 'react';
import ClassificationForm from './components/ClassificationForm';
import SendOTP from './components/SendOTP';
import VerifyOTP from './components/VerifyOTP';
import { Container } from '@mui/material';

const App = () => {
    return (
        <Container>
            <SendOTP />
            <VerifyOTP />
            <ClassificationForm />
        </Container>
    );
};

export default App;
