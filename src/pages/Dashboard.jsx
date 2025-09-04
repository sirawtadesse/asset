import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
    const { user } = useAuth();
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Paper sx={{ p: 2 }}>
                <Typography variant="h6">
                    Welcome back, {user?.full_name}!
                </Typography>
                <Typography>
                    Your role is: {user?.role}
                </Typography>
                 <Typography sx={{mt: 2}}>
                    Select an option from the sidebar to manage your assets.
                </Typography>
            </Paper>
        </Box>
    );
}