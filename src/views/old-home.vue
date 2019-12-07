<template>
    <div id="app">
        <el-row>
            <el-col :span="16" :offset="4">
                <div class="grid-content">
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                        of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                        but also the leap into electronic typesetting, remaining essentially unchanged.
                    </p>
                </div></el-col
            ></el-row
        >
        <br />
        <br />
        <br />
        <Form />
    </div>
</template>

<script>
import Form from '../components/Form';
export default {
    name: 'app',
    components: {
        Form
    }
};
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
