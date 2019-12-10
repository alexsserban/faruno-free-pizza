<template>
  <div id="mybg">
    <div class="container mx-auto md:py-20">
      <div class="flex flex-wrap-reverse justify-center bg-white shadow-2xl">
        <img class="object-cover lg:w-1/3" src="../assets/pizza.jpg" />
        <div class="flex flex-col items-center justify-center w-2/3">
          <img class="h-24 my-10 mb-8" src="../assets/logo.png" alt="" />

          <p class="md:w-3/4">
            Cu ocazia deschiderii noului local, poti completa formularul si
            primesti de la noi o pizza gratis.
          </p>

          <div class="flex flex-wrap justify-center mt-8 md:w-full ">
            <p class="px-4 md:w-1/2">
              <span class="font-bold ">Contact</span>
              <br />

              Telefon:
              <a class="font-medium" href="tel:+40727 810 810">0727 810 810</a>
              <br />

              Email:
              <a class="font-medium" href="mailto: contact@faruno.ro"
                >contact@faruno.ro</a
              >
            </p>

            <p class="px-4 py-6 md:w-1/2 md:py-0">
              <span class="font-bold ">Locatie</span> <br />
              Strada Ion Brezoianu, Nr. 15 <br />
              Sector 1, Bucuresti, Romania
            </p>
          </div>

          <Form class="py-10 lg:w-8/12" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Form from "../components/Form";

export default {
  components: { Form }
};
</script>

<style scoped>
#mybg {
  background-image: url("../assets/bg.jpg");
}
</style>
