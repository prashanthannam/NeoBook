import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import profile from '../views/Profile.vue'
import Team from '../views/Team.vue'
import OthersProfile from '../views/othersProfile.vue'
import Chat from '../views/chatsm.vue'
import PostView from '../views/postView.vue'
import teamMut from '../views/TeamMut.vue'
import firebase from 'firebase'

Vue.use(VueRouter)


const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes: [{
                path: '/',
                name: 'home',
                component: Home,
                meta: {
                    requiresAuth: true
                }
            },

            {
                path: '/profile',
                name: 'profile',
                component: profile,
                meta: {
                    requiresAuth: true
                }

            },
            {
                path: '/team',
                name: 'team',
                component: Team,
                meta: {
                    requiresAuth: true
                }

            },
            {
                path: '/othersProfile/:id',
                name: 'othersProfile',
                component: OthersProfile,

            },
            {
                path: '/postView/:id',
                name: 'postView',
                component: PostView,

            },
            {
                path: '/teamMut/:id',
                name: 'teamMut',
                component: teamMut,

            },
            {
                path: '/chat',
                name: 'chat',
                component: Chat,

            }
            // {
            //     path: '/login',
            //     name: 'login',
            //     component: Login,


            // },

        ],

    },

)
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    const isAuthent = firebase.auth().currentUser;
    if (requiresAuth && !isAuthent) {
        next('/')
    } else {
        next()
    }
})
export default router