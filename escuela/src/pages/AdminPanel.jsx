import { useState } from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Tabs,
    Tab,
    Box,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService, contactService } from '../services/api';
import toast from 'react-hot-toast';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <div hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
};

const AdminPanel = () => {
    const [tabValue, setTabValue] = useState(0);
    const queryClient = useQueryClient();

    const { data: admins = [], isLoading: adminsLoading } = useQuery({
        queryKey: ['admins'],
        queryFn: adminService.getAllAdmins,
    });

    const { data: messages = [], isLoading: messagesLoading } = useQuery({
        queryKey: ['messages'],
        queryFn: contactService.getMessages,
    });

    const removeAdminMutation = useMutation({
        mutationFn: adminService.removeAdmin,
        onSuccess: () => {
            queryClient.invalidateQueries(['admins']);
            toast.success('Admin removed successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to remove admin');
        },
    });

    const updateMessageStatusMutation = useMutation({
        mutationFn: ({ id, status }) => contactService.updateMessageStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries(['messages']);
            toast.success('Message status updated');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to update message status');
        },
    });

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleRemoveAdmin = (id) => {
        if (window.confirm('Are you sure you want to remove this admin?')) {
            removeAdminMutation.mutate(id);
        }
    };

    const handleMessageStatus = (id, status) => {
        updateMessageStatusMutation.mutate({ id, status });
    };

    if (adminsLoading || messagesLoading) {
        return (
            <Container>
                <Typography>Loading...</Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Admin Panel
            </Typography>

            <Paper sx={{ width: '100%', mb: 2 }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab label="Admins" />
                    <Tab label="Messages" />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {admins.map((admin) => (
                                    <TableRow key={admin.id}>
                                        <TableCell>{admin.name}</TableCell>
                                        <TableCell>{admin.email}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                onClick={() => handleRemoveAdmin(admin.id)}
                                            >
                                                Remove Admin
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Subject</TableCell>
                                    <TableCell>Message</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {messages.map((message) => (
                                    <TableRow key={message.id}>
                                        <TableCell>{message.name}</TableCell>
                                        <TableCell>{message.email}</TableCell>
                                        <TableCell>{message.subject}</TableCell>
                                        <TableCell>{message.message}</TableCell>
                                        <TableCell>{message.status}</TableCell>
                                        <TableCell>
                                            <Grid container spacing={1}>
                                                {message.status === 'new' && (
                                                    <Grid item>
                                                        <Button
                                                            variant="outlined"
                                                            size="small"
                                                            onClick={() =>
                                                                handleMessageStatus(
                                                                    message.id,
                                                                    'read'
                                                                )
                                                            }
                                                        >
                                                            Mark as Read
                                                        </Button>
                                                    </Grid>
                                                )}
                                                {message.status === 'read' && (
                                                    <Grid item>
                                                        <Button
                                                            variant="outlined"
                                                            size="small"
                                                            onClick={() =>
                                                                handleMessageStatus(
                                                                    message.id,
                                                                    'replied'
                                                                )
                                                            }
                                                        >
                                                            Mark as Replied
                                                        </Button>
                                                    </Grid>
                                                )}
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
            </Paper>
        </Container>
    );
};

export default AdminPanel; 