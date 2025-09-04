import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Assets() {
    const { user } = useAuth();
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const [currentAsset, setCurrentAsset] = useState(null);

    const fetchAssets = async () => {
        try {
            setLoading(true);
            const response = await api.get('/assets.php');
            setAssets(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch assets.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssets();
    }, []);

    const handleOpen = (asset = null) => {
        setCurrentAsset(asset || { name: '', serial_number: '', status: 'available' });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentAsset(null);
    };

    const handleSave = async () => {
        try {
            if (currentAsset.id) {
                // Update
                await api.put('/assets.php', currentAsset);
            } else {
                // Create
                await api.post('/assets.php', currentAsset);
            }
            fetchAssets();
            handleClose();
        } catch (err) {
            console.error("Failed to save asset:", err);
        }
    };
    
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this asset?')) {
            try {
                await api.delete(`/assets.php?id=${id}`);
                fetchAssets();
            } catch (err) {
                console.error("Failed to delete asset:", err);
            }
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Asset Name', width: 200 },
        { field: 'serial_number', headerName: 'Serial Number', width: 150 },
        { field: 'status', headerName: 'Status', width: 120 },
        { field: 'assigned_employee', headerName: 'Assigned To', width: 180 },
        { field: 'asset_type_name', headerName: 'Type', width: 130 },
        { field: 'location_name', headerName: 'Location', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 150,
            renderCell: (params) => (
                user.role === 'admin' && (
                    <>
                        <Button size="small" onClick={() => handleOpen(params.row)}>Edit</Button>
                        <Button size="small" color="secondary" onClick={() => handleDelete(params.id)}>Delete</Button>
                    </>
                )
            ),
        },
    ];

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4">Manage Assets</Typography>
                {user.role === 'admin' && (
                    <Button variant="contained" onClick={() => handleOpen()}>Add New Asset</Button>
                )}
            </Box>
            <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={assets}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                />
            </Box>
            
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{currentAsset?.id ? 'Edit Asset' : 'Add New Asset'}</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Asset Name" type="text" fullWidth value={currentAsset?.name || ''} onChange={(e) => setCurrentAsset({ ...currentAsset, name: e.target.value })} />
                    <TextField margin="dense" label="Serial Number" type="text" fullWidth value={currentAsset?.serial_number || ''} onChange={(e) => setCurrentAsset({ ...currentAsset, serial_number: e.target.value })}/>
                    {/* Add more fields for description, purchase_date, etc. */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}