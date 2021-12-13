const resource = '/accounts'

export default ($axios) => ({
    all(params) {
        return $axios.get(`${resource}`, {
            params
        })
    },

    create(payload) {
        return $axios.post(`${resource}`, payload)
    },

    selectPlan(payload){
        return $axios.post(`${resource}/plan`, payload)
    },

    show(id) {
        return $axios.get(`${resource}/${id}`)
    },

    update(id, payload) {
        return $axios.put(`${resource}/${id}`, payload)
    },

    delete(id) {
        return $axios.delete(`${resource}/${id}`)
    },

    restore(id) {
        return $axios.put(`${resource}/${id}/restore`)
    },
})
