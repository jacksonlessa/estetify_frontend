const resource = '/users'

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

    update(payload) {
        return $axios.put(`${resource}`, payload)
    },

    delete(id) {
        return $axios.delete(`${resource}/${id}`)
    },

    create(payload) {
        return $axios.post(`${resource}`, payload)
    }
})
