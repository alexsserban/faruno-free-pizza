<template>
    <div class="" id="mybg">
        <div class="container mx-auto md:py-20">
            <div class="flex flex-wrap-reverse justify-center bg-white shadow-2xl">
                <img class="object-cover lg:w-1/3" src="../assets/pizza.jpg" />
                <div class="flex flex-col items-center justify-center w-2/3">
                    <img class="h-24 my-10 mb-8" src="../assets/logo-vatra.png" alt="" />
                    <p class="md:w-3/4">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                        of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                        but also the leap into electronic typesetting, remaining essentially unchanged.
                    </p>
                    <Form class="py-10 lg:w-8/12" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Form from '../components/Form';
export default {
    components: {Form}
};
</script>

<style scoped>
#mybg {
    background-image: url('../assets/3388.jpg');
}
</style>
