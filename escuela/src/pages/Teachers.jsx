import { useState } from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teacherService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Teachers = () => {
    const { isAdmin } = useAuth();
    const [open, setOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const queryClient = useQueryClient();

    const { data: teachers = [], isLoading } = useQuery({
        queryKey: ['teachers'],
        queryFn: teacherService.getAllTeachers,
    });

    const addTeacherMutation = useMutation({
        mutationFn: teacherService.addTeacher,
        onSuccess: () => {
            queryClient.invalidateQueries(['teachers']);
            handleClose();
            toast.success('Teacher added successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to add teacher');
        },
    });

    const updateTeacherMutation = useMutation({
        mutationFn: ({ id, data }) => teacherService.updateTeacher(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['teachers']);
            handleClose();
            toast.success('Teacher updated successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to update teacher');
        },
    });

    const deleteTeacherMutation = useMutation({
        mutationFn: teacherService.deleteTeacher,
        onSuccess: () => {
            queryClient.invalidateQueries(['teachers']);
            toast.success('Teacher removed successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to remove teacher');
        },
    });

    const handleOpen = (teacher = null) => {
        setSelectedTeacher(teacher);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedTeacher(null);
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const teacherData = Object.fromEntries(formData.entries());

        if (selectedTeacher) {
            updateTeacherMutation.mutate({
                id: selectedTeacher.id,
                data: teacherData,
            });
        } else {
            addTeacherMutation.mutate(teacherData);
        }
    };

    if (isLoading) {
        return (
            <Container>
                <Typography>Loading teachers...</Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" component="h1" gutterBottom>
                        Our Teachers
                    </Typography>
                    {isAdmin && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpen()}
                        >
                            Add Teacher
                        </Button>
                    )}
                </Grid>
                {teachers.map((teacher) => (
                    <Grid item xs={12} sm={6} md={4} key={teacher.id}>
                        <Card>
                            {teacher.imageUrl && (
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={teacher.imageUrl}
                                    alt={teacher.name}
                                />
                            )}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {teacher.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {teacher.subject}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {teacher.email}
                                </Typography>
                                {teacher.bio && (
                                    <Typography variant="body2" color="text.secondary">
                                        {teacher.bio}
                                    </Typography>
                                )}
                                {isAdmin && (
                                    <Grid container spacing={1} mt={2}>
                                        <Grid item>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={() => handleOpen(teacher)}
                                            >
                                                Edit
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                color="error"
                                                onClick={() => deleteTeacherMutation.mutate(teacher.id)}
                                            >
                                                Delete
                                            </Button>
                                        </Grid>
                                    </Grid>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {selectedTeacher ? 'Edit Teacher' : 'Add New Teacher'}
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    defaultValue={selectedTeacher?.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    defaultValue={selectedTeacher?.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Subject"
                                    name="subject"
                                    defaultValue={selectedTeacher?.subject}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    name="phone"
                                    defaultValue={selectedTeacher?.phone}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Bio"
                                    name="bio"
                                    multiline
                                    rows={4}
                                    defaultValue={selectedTeacher?.bio}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Image URL"
                                    name="imageUrl"
                                    defaultValue={selectedTeacher?.imageUrl}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" variant="contained">
                            {selectedTeacher ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Container>
    );
};

export default Teachers; 