<template>
    <div>
        <div class="project" :class="{complete: project.isCompleted}">
            <div class="flexing">
                <div @click.prevent="showingDetail">
                    <h3 >{{project.title}}</h3>
                </div>
                <div>
                    <!-- delete -->
                    <span>
                    <i class="fas fa-trash" @click.prevent="deleteProject(project.id)"></i>
                    </span>
                    <!-- edit -->
                    <span>
                        <router-link :to="{name: 'edit-project', params: {id: project.id}}">
                            <i class="far fa-edit"></i>
                        </router-link>
                    </span>                    
                    <!-- success -->
                    <span>
                        <i class="far fa-check-circle" @click.prevent="successProject()"></i>
                    </span>
                </div>
            </div>
            <p v-if="showDetail">{{project.detail}}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props: ['project'],
    data(){
        return{
            showDetail: false,
        }
    },
    methods:{
        view(){
            axios.get('api/projects')
            .then((response) => this.projects = response.data)
            .catch((error) => console.log(error))
        },

        showingDetail(){
            this.showDetail =! this.showDetail;
        },

        deleteProject(id){
            Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`api/projects/${id}`)
                .then((response) => {
                this.view()
                this.$emit('delete', this.project.id)
                Swal.fire({ title: 'Deleted', icon: 'success'})
            })
            }
        })     
        },

        successProject(){
            axios.patch(`/api/projects/${this.project.id}`, this.project, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            .then((response)=>{
                this.view()
                this.$emit("completed", response.data.id)
            })
            .catch(err => console.log(err.response))
        }
    }
}
</script>

<style scoped>
    .project{
        padding:20px;
        background-color: #f2f2f2;
        margin: 10px;
        border-left: 6px solid crimson;
        border-radius: 8px;
    }
    h3{
        cursor: pointer;
        color:indigo;
        user-select: none;
    }
    .flexing{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    span{
        margin-left:10px;
    }
    span:hover{
        cursor: pointer;
        color:#777;
    }
    .complete{
        border-left-color: green;
    }
</style>