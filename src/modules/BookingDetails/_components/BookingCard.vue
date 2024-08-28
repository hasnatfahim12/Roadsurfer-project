<template>
  <div class="sm:w-full md:w-4/6 lg:w-3/6 space-y-2">

    <div class="flex items-center justify-center sm:justify-start">
      <button
      @click="$router.push('/')"
      class="p-2  rounded-md border-2 border-black text-white bg-gray-800"
      >
      &#8592; Back to booking schedules
    </button>
  </div>
  <div class=" rounded-md bg-gray-200 border border-black  p-4 ">
    <img src="../../../assets/CarImages/1.webp" class="object-cover rounded-md" />
    <div class="flex flex-col  sm:mx-20">
      <div v-if="loading" class="flex items-center justify-center p-10">
        Loading...
        
      </div>
      <div >
        <div class="flex flex-row  items-center justify-around pt-4 space-x-6 px-4">
          <div class="flex flex-col space-y-4 text-lg font-semibold">
            <span>Customer</span>
            <span>Station</span>
            <span>Start</span>
            <span>End</span>
            <span>Duration</span>
          </div>
          <div class="flex flex-col space-y-4 text-lg">
            <span>{{ customerName ?? '-' }}</span>
            <span>{{ stationName ?? '-' }}</span>
            <span>{{ startDate ?? '-' }}</span>
            <span>{{ endDate ?? '-' }}</span>
            <span>{{ duration? `${duration} days` : '-' }}</span>
          </div>  
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: "BookingCard",
  props: {
    customerName: { type: String, default: '' },
    stationName: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    duration: { type: String, default: '' },
    loading: { type: Boolean, default: false }
  }
  
}
</script>

<style>

</style>