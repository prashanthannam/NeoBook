import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/index'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'

Vue.config.productionTip = false

let app;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        store.dispatch('fetchUserDetails', user)
    }
    if (!app) {
        app = new Vue({
            router,
            store: store,
            vuetify,
            render: h => h(App)
        }).$mount('#app')
    }

})