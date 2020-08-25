import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import db from '@/fb'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {

        uname: '',
        email: '',
        profPic: '',
        gender: '',
        uid: '',

    },
    getters: {
        userDetails(state) {
            return state.user;
        }
    },
    mutations: {
        changeUser(state, payload) {
            state.uname = payload.name;
            state.email = payload.email;
            state.profPic = payload.profPic;
            state.coverPic = payload.coverPic
            state.gender = payload.gender;
            state.uid = payload.id;
        },
        changeProfPic(state, payload) {
            state.profPic = payload
        },
        changeCoverPic(state, payload) {
            state.coverPic = payload
        },
        changeUID(state, payload) {
            state.uid = payload
        }
    },
    actions: {
        Register: (context, arg) => {
            firebase.auth().createUserWithEmailAndPassword(arg.email, arg.password).then((res) => {
                db.collection('users').doc(res.user.uid).set({ name: arg.name, email: arg.email, profPic: '', coverPic: '', gender: arg.gender, inRequests: [], friends: [] })
                arg.id = res.user.id
                context.commit('changeUser', arg)
            })
        },
        Login: (context, user) => {
            console.log(user)
            db.collection('users').doc(user.user.uid).get().then((res) => {
                const resa = res.data()
                resa.id = res.id
                console.log(res)
                context.commit('changeUser', resa)
                this.$router.go()
            })


        },
        fetchUserDetails: (context, arg) => {
            context.commit('changeUID', arg.uid)
            db.collection('users').doc(arg.uid).get().then((res) => {
                const resa = res.data()
                resa.id = res.id
                context.commit('changeUser', resa)
            })


        }
    },
    modules: {}
})