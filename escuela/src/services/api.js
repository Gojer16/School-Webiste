import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth services
export const authService = {
    register: (userData) => api.post('/users/register', userData),
    login: (credentials) => api.post('/users/login', credentials),
    getProfile: () => api.get('/users/profile'),
    changePassword: (data) => api.put('/users/change-password', data),
};

// Teacher services
export const teacherService = {
    getAllTeachers: () => api.get('/teachers'),
    addTeacher: (teacherData) => api.post('/teachers', teacherData),
    updateTeacher: (id, teacherData) => api.put(`/teachers/${id}`, teacherData),
    deleteTeacher: (id) => api.delete(`/teachers/${id}`),
};

// Contact services
export const contactService = {
    submitContact: (contactData) => api.post('/contact', contactData),
    getMessages: () => api.get('/contact'),
    updateMessageStatus: (id, status) => api.put(`/contact/${id}`, { status }),
};

// Admin services
export const adminService = {
    getAllAdmins: () => api.get('/admins'),
    assignAdminRole: (id) => api.put(`/admins/${id}`),
    removeAdmin: (id) => api.delete(`/admins/${id}`),
};

export default api; 