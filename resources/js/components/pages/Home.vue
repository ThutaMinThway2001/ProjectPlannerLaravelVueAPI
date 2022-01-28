<template>
    <div>
        <div class="home">
            <h1>Project Planner</h1>
            <FilterNav @filterBy="current = $event" :current="current"></FilterNav>
            <div v-for="project in filterByName" :key="project.id">
                <SingleProject :project="project" @completed="completeProject" @delete="deleteProject"></SingleProject>
            </div>
        </div>
    </div>
</template>

<script>
import FilterNav from '../components/FilterNav'
import SingleProject from './SingleProject'
import axios from 'axios'
export default {
  components: {
    FilterNav, SingleProject },
    data(){
        return{
            projects : [],
            current: 'all'
        }
    },
    created(){
        this.view();
    },
    methods:{
        view(){
            axios.get('api/projects')
        .then((response) => this.projects = response.data)
        .catch((error) => console.log(error))
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