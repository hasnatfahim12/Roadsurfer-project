<template>
  <div class="relative flex-col space-y-1">
    <input 
      :value="searchValue"
      @input="$emit('handle-input', $event)"
      placeholder="Search Stations"
      class="h-12 w-80 rounded-md border-2 border-black px-2"
    />
    <div v-if="showSearchResults" class="w-full bg-white border border-black rounded-md z-20 absolute" >
      <div v-if="searchedStationsList.length > 0">
        <div 
          v-for="searchedStation in searchedStationsList"
          :key="searchedStation.id" 
          class=" w-full space-y-4 rounded-md  flex flex-col"
        >
          <span 
            @click="$emit('select-station', searchedStation)" 
            class="text-black font-medium px-2 py-4 hover:bg-gray-200 hover:rounded-md w-full cursor-pointer"
          >
            {{ searchedStation.name }}
          </span>            
        </div>
      </div>
      <div v-else class="flex">
        <span class="text-black font-medium px-2 py-4 hover:bg-gray-200 hover:rounded-md w-full">No result found</span>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: "SearchTab",
  props: {
    searchValue: { type: String, default: '' },
    showSearchResults: { type: Boolean, default: false },
    searchedStationsList: { type: Array, default: () => [] }
  },
  emits: ['handle-input']
}
</script>

<style>

</style>