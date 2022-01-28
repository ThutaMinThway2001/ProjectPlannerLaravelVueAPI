<template>
    <div>
        <div class="home">
            <loading :active.sync="isLoading" 
                :can-cancel="true" 
                :on-cancel="onCancel"
                :is-full-page="fullPage">
            </loading>
            <h1>Project Planner</h1>
            <FilterNav @filterBy="current = $event" :current="current"></FilterNav>
            <div v-for="project in filterByName" :key="project.id">
                <SingleProject :project="project" @completed="completeProject" @delete="deleteProject"></SingleProject>
            </div>
        </div>
    </div>
</template>

<script>
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import FilterNav from '../components/FilterNav'
import SingleProject from './SingleProject'
import axios from 'axios'
export default {
  components: {
    FilterNav, SingleProject, Loading },
    data(){
        return{
            isLoading: false,
            projects : [],
            current: 'all'
        }
    },
    created(){
        this.view();
    },
    methods:{
        view(){
            this.$Progress.start()
            this.isLoading = true;
            axios.get('api/projects')
        .then((response) => {
            this.projects = response.data
            setTimeout(() => {
                this.isLoading = false
            },3000)
                this.$Progress.finish()
            }
        )
        .catch((error) => this.$Progress.fail())
        },

        deleteProject(id){
            this.projects = this.projects.filter((project)=>{
                return project.id != id
            })
        },

        completeProject(id){
        let findProjectId = this.projects.find((project)=>{
            return project.id === id;
        })
        findProjectId.isCompleted =! findProjectId.isCompleted;
    }
    },
    computed:{
        filterByName(){
            if(this.current === 'complete'){
                return this.projects.filter((project)=>{
                    return project.isCompleted
                })
            }
            if(this.current === 'ongoing'){
                return this.projects.filter((project)=>{
                    return !project.isCompleted
                })
            }
            return this.projects
        }
    },
    
}
</script>

<style>

</style>