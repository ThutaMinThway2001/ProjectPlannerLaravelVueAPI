import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeComponent from './components/pages/Home'
import AddProjectComponent from './components/pages/AddProject'
import EditProjectComponent from './components/pages/EditProject'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/', 
            component: HomeComponent,
            name: 'home'
        },
        {
            path: '/add-project',
            component: AddProjectComponent,
            name: 'add-project'
        },
        {
            path: '/edit-project/:id',
            component: EditProjectComponent,
            name: 'edit-project',
            props: true
        }

    ],
    mode: 'history',
})