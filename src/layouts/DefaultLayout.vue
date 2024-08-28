<template>
  <div class="bg-[#F5F5F5] flex w-full h-full flex-col text-black min-h-screen min-w-screen px-0 sm:px-4 pb-4 md:pb-20">
    <div class=" flex items-center justify-center">
      <p class="sm:text-8xl text-6xl font-semibold mb-10 cursor-pointer" @click="$router.push('/')">
          SurferRoad
      </p>
    </div>
    <div class=" overflow-scroll">
        <router-view  :key="$route.fullPath" /> 
    </div>
  </div>
  
</template>
  
<script>

export default {
  name: 'DefaultLayout',
  components: { 
  },
  mounted() {
    console.log('test arrival')
  }

}
</script>
  
<style scoped>
  /* Add your styles here */
</style>
  