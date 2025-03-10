import { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Grid,
    Avatar,
    Button,
    TextField,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState({
        current: '',
        new: '',
        confirm: '',
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setPassword({ current: '', new: '', confirm: '' });
    };

    const changePasswordMutation = useMutation({
        mutationFn: (data) => authService.changePassword(data),
        onSuccess: () => {
            toast.success('Password changed successfully');
            handleClose();
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to change password');
        },
    });

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPassword((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.new !== password.confirm) {
            toast.error('New passwords do not match');
            return;
        }
        changePasswordMutation.mutate({
            currentPassword: password.current,
            newPassword: password.new,
        });
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4} display="flex" flexDirection="column" alignItems="center">
                        <Avatar
                            sx={{
                                width: 100,
                                height: 100,
                                bgcolor: 'primary.main',
                                mb: 2,
                            }}
                        >
                            <Person sx={{ fontSize: 60 }} />
                        </Avatar>
                        <Button variant="outlined" onClick={handleOpen}>
                            Change Password
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" gutterBottom>
                            Profile Information
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="subtitle1" color="text.secondary">
                                Name
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                {user.name}
                            </Typography>

                            <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
                                Email
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                {user.email}
                            </Typography>

                            <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
                                Role
                            </Typography>
                            <Typography variant="h6" gutterBottom sx={{ textTransform: 'capitalize' }}>
                                {user.role}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Change Password</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="current"
                                    label="Current Password"
                                    type="password"
                                    value={password.current}
                                    onChange={handlePasswordChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="new"
                                    label="New Password"
                                    type="password"
                                    value={password.new}
                                    onChange={handlePasswordChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirm"
                                    label="Confirm New Password"
                                    type="password"
                                    value={password.confirm}
                                    onChange={handlePasswordChange}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={changePasswordMutation.isLoading}
                        >
                            {changePasswordMutation.isLoading ? 'Changing...' : 'Change Password'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Container>
    );
};

export default Dashboard; 