<template>
  <div class="flex flex-row justify-between pt-4 sticky left-0 sm:static  ">
    <div class="relative">
      <div class="absolute flex items-center justify-center  whitespace-nowrap -top-0 ml-2  h-full cursor-pointer">
        <span class=" px-2 text-white text-base md:text-lg text-center bg-black">{{ selectedDate }}</span>
      </div>
      <input 
        type="date" 
        @input="$emit('handle-date-input', $event)" 
        class=" sm:w-48 w-28 px-2 h-10 sm:h-12 bg-black text-transparent border rounded-md border-gray-400"
      />
    </div>
    <div class="flex flex-row space-x-2 ">
      <div>
        <button
          @click="$emit('toggle-time-format')"
          class="h-10 sm:h-12  rounded-md border-2 border-black px-4 text-white bg-gray-800 whitespace-nowrap text-sm md:text-base "
        >
          {{ is24HourFormat ? '24 Hour' : '12 Hour' }}
        </button>
      </div>
      <div class="sm:h-12 h-10 px-4 rounded-md border border-gray-400 text-lg sm:text-xl md:text-2xl flex items-center justify-around text-white space-x-4">
        <span class="cursor-pointer" @click="$emit('prev-week')"> &#8592; </span>
        <span class="hidden sm:block text-base md:text-lg">Navigate</span>
        <span class=" block sm:hidden text-sm md:text-lg "> | </span>
        <span class="cursor-pointer" @click="$emit('next-week')"> &#8594; </span>
      </div>
    </div>
  
  </div>  
</template>

<script>
export default {
  name: 'CalendarNavigation',
  props: {
    selectedDate: { type: String, default: '' },
    is24HourFormat: { type: Boolean, default: false }
  },
  emits: ['next-week', 'prev-week', 'handle-date-input', 'toggle-time-format'],
  
}
</script>

<style>
  input[type="date"]::-webkit-calendar-picker-indicator {
    color-scheme: dark;
  }
</style>