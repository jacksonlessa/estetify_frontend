const resource = '/api/users'

export default ($axios) => ({
    all(params) {
        return $axios.get(`${resource}`, {
            params
        })
    },

    show(id) {
        return $axios.get(`${resource}/${id}`)
    },

    resetPassword(payload) {
        return $axios.put(`auth/recover-password`, payload)
    },

    update(id, payload) {
        return $axios.put(`${resource}/${id}`, payload)
    },

    delete(id) {
        return $axios.delete(`${resource}/${id}`)
    },

    create(payload) {
        return $axios.post(`${resource}`, payload)
    }
})
