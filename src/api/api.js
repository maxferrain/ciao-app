import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'eaa23ed7-342f-46f2-9488-3de03c2db2c9'
    }
})

export const profileAPI = {
    setProfile: (profileId) => {
        return instance.get(`profile/${profileId}`)
            .then(response => response.data)
    },
    getStatus: (userId) => instance.get(`profile/status/${userId}`),
    setStatus: (status) => instance.put(`profile/status`, {status})
}

export const authAPI = {
    me: () => {
        return instance.get('auth/me')
            .then(response => response.data)
    },
    login: (authData) => instance
        .post('auth/login', {...authData}),
    logout: () => instance
        .delete('auth/login')
}

export const usersAPI = {
    setUsers: (usersOnPage, pageSelected) => {
        return instance.get(`users?count=${usersOnPage}&page=${pageSelected}`)
            .then(response => response.data)
    },

    follow: (userId) => {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },

    unfollow: (userId) => {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    }

}