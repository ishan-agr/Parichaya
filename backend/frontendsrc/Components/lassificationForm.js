import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const ClassificationForm = () => {
    const [inputData, setInputData] = useState('');
    const [prediction, setPrediction] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:8000/api/classify/', { input_data: inputData });
        setPrediction(response.data.prediction);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Classification Model</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Input Data"
                    variant="outlined"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">Classify</Button>
            </form>
            {prediction && (
                <Typography variant="h6" gutterBottom>Prediction: {prediction}</Typography>
            )}
        </Container>
    );
};

export default ClassificationForm;
