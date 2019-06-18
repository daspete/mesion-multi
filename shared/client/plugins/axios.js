export default function({ $axios, store }){
    $axios.onRequest((config) => {
        if(store.getters['auth/Token']){
            config.headers.Authorization = `Bearer ${ store.getters['auth/Token'] }`
        }
    })
}