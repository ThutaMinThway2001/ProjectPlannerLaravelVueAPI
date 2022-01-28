<template>
    <div>
        <h1>Add Project</h1>
        <form @submit.prevent="addProject">
            <label>Project Title</label>
            <input type="text" v-model="project.title">
            <div class="text-danger mt-3" v-if="project.errors.has('title')" v-html="project.errors.get('title')" />
            <label>Project Detail</label>
            <input type="text" v-model="project.detail">
            <div class="text-danger mt-3" v-if="project.errors.has('detail')" v-html="project.errors.get('detail')" />
            <button type="submit">Add Project</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import Form from 'vform'
export default {
    data(){
        return{
            project: new Form({
                id: '',
                name: '',
                detail: ''
            }) 
        }
    },
    methods:{
        view(){
            axios.get('api/projects')
        .then((response) => this.projects = response.data)
        .catch((error) => console.log(error))
        },

        addProject(){
            this.project.post(`api/projects`)
            .then((response) => {
                this.view();
                Toast.fire({
                    icon: 'success',
                    title: 'Created Successfully in successfully'
                });
                this.$router.push('/')
            })
            .catch((error) => console.log(error))
        }
    }
}
</script>

<style>
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