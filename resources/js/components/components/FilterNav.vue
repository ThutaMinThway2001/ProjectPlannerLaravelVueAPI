<template>
    <nav class="filter-nav">
        <button @click="filter('all')" :class="{active: current==='all'}">all</button>
        <button @click="filter('complete')" :class="{active: current==='complete'}">complete</button>
        <button @click="filter('ongoing')" :class="{active: current==='ongoing'}">ongoing</button>
    </nav>
</template>

<script>
export default {
    props: ['current'],
    methods:{
        filter(value){
            this.$emit('filterBy', value);
        }
    }
}
</script>

<style>
    .filter-nav button {
        background: none;
        border: none;
        color: #bbb;
        outline: none;
        font-size: 12px;
        text-transform: uppercase;
        margin-right: 10px;
        letter-spacing: 1px;
        font-weight: bold;
        cursor: pointer;
    }
    button.active {
        color: #333;
    }
</style>