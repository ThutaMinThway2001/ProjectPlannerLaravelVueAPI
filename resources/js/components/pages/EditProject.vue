<template>
    <div>
        <h1>Edit Project</h1>
        <form @submit.prevent="updateProject">
            <label>Project Title</label>
            <input type="text" v-model="project.title">
        
            <label>Project Detail</label>
            <input type="text" v-model="project.detail">
            
            <button type="submit">Update</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['id'],
    data(){
        return{
            project:{}
        }
    },
    methods:{
        updateProject(){
            axios.put(`http://localhost:8000/api/projects/${this.id}`, this.project)
            .then((response) => {
                Toast.fire({
                    icon: 'success',
                    title: 'Updated in successfully'
                });
                this.$router.push('/')
            })
        }
    },
    created(){
        axios.get(`http://localhost:8000/api/projects/${this.id}`).then((res)=> 
            {this.project = res.data;});
        },
}
</script>

<style scoped>
    form {
        background: white;
        padding: 20px;
        border-radius: 10px;
    }
    label {
        display: block;
        color: #bbb;
        text-transform: uppercase;
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 1px;
        margin: 20px 0 10px 0
    }
    input {
        padding: 10px;
        border: 0;
        border-bottom: 1px solid #ddd;
        width: 100%;
        box-sizing: border-box;
    }
    textarea {
        border: 1px solid #ddd;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        height: 100px;
    }
    form button {
        display: block;
        margin: 20px auto 0;
        background: #00ce89;
        color: white;
        padding: 10px;
        border: 0;
        border-radius: 6px;
        font-size: 16px;
    }
</style>