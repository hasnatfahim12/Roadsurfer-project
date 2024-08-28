<template>
  <div class="flex items-center justify-center space-x-4">
    <SearchTab
      :search-value="searchValue"
      :show-search-results="showSearchResults"
      :searched-stations-list="searchedStationsList"
      @handle-input="handleSearchInput"
      @select-station="handleSelectStation"
    />  
  </div> 
  <div class=" flex flex-col mt-8 bg-black px-4 h-[40rem] sm:h-[34rem] overflow-scroll relative mx-0 sm:mx-4 mdx:mx-12 rounded-sm sm:rounded-md ">

    <CalendarNavigation 
      :selected-date="formatDateShort(selectedDate)"
      :is-24-hour-format="is24HourFormat"
      @next-week="jumpToNextWeek"
      @prev-week="jumpToPrevWeek"
      @handle-date-input="selectedDate = $event.target.value"
      @toggle-time-format="toggleTimeFormat"

    />
    

    <div class="flex flex-row pt-2 md:pl-6 md:pr-12 pl-2 pr-4 ">
      <div class=" flex flex-col">
        <div class="h-24 w-full  bg-black sticky top-0" />
        <div class="px-2 pt-9">
          <div
            v-for="hour in 24"
            :key="hour"
            class="text-white whitespace-nowrap h-12 text-xs md:text-sm"
          >
            {{ formatHour(hour) }}
          </div>
        </div>
      </div>
      
      
      <div class="flex flex-row w-full ">
        <div
          v-for="(day, dayIndex) in days"
          :key="dayIndex"
          class="w-full h-fit "
        >
          <div class="w-full flex flex-col items-center justify-center sticky top-0 bg-black py-4">
            <span class=" text-lg md:text-xl text-center font-light text-white">
              {{ getDayName(dayIndex).split(' ')[0] }}
            </span>
            <span class="text-xl md:text-2xl text-center font-light text-white">
              {{ getDayName(dayIndex).split(' ')[1] }}
            </span>
          </div>
        
          <div 
            class="relative bg-slate-700 h-fit w-40 overflow-x-scroll sm:w-full p-1 "
            :class="dayIndex === 0? 'rounded-tl-md rounded-bl-md' : dayIndex === 6? 'rounded-tr-md rounded-br-md' : ''"
          >
            <div
              v-for="hour in 24"
              :key="hour"
              class="bg-gray-800 h-12 border-b-2 border-b-black first:rounded-t-md last:rounded-b-md last:border-none relative "
              @dragover.prevent
              @drop="handleDrop($event,  dayIndex, hour - 1)"
            />
          
            <div
              v-for="booking in filteredBookings(day)"
              :key="booking.id"
              :style="calculateBookingPosition(booking)"
              class="absolute text-white p-2 rounded-md shadow-lg min-h-14 cursor-pointer"
              :class="booking.cardType === 'pickup'? 'bg-blue-500' : 'bg-red-500'"
              draggable="true"
              @dragstart="handleDragStart(booking)"
              @drag="handleDrag($event, booking, dayIndex)"
              @dragend="handleDragEnd"
              @click="$router.push({name: 'BookingDetails', params:{stationId: selectedStation.id, bookingId: booking.id}})"
            >
              <div class="text-xs">
                {{ booking.cardType === 'pickup' ? formatEventDateTime(new Date(booking.startDate)) : formatEventDateTime(new Date(booking.endDate)) }}
              </div>
              <div class=" text-base ">
                {{ (booking.cardType === 'pickup' ? 'Pickup by ' : 'Return by ') +  booking.customerName }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  
  <script>
  
  import { useDateFormatter } from '../../composables/useDateFormatter'
  import { useBookingsStore } from '../../stores/bookings' 
  import CalendarNavigation from './_components/CalendarNavigation.vue';
  import SearchTab from './_components/SearchTab.vue';

  export default {
    name: 'Calendar',
    components: {
      SearchTab,
      CalendarNavigation
    },
    data() {
      return {
        input: '',
        searchValue: '',
        showSearchResults: false,
        is24HourFormat: false,
        selectedDate: new Date(),
        draggedEvent: null,
        draggedPosition: null,
        debounceTimer: null,
        tempCardType: ''     
      };
    },
    setup() {
      const bookingsStore = useBookingsStore()
      const { formatDate, formatDateShort } = useDateFormatter()
  
      return { bookingsStore, formatDate, formatDateShort }
    },
    async mounted() {
      await this.fetchAllStationData()
    },
    computed: {
      selectedStation() {
        return this.bookingsStore.selectedStation
      },
      bookingsByStation() {
        return this.bookingsStore.bookingsByStations
      },
      searchedStationsList() {
        return this.bookingsStore.stationsList
      },
      days() {
        const startOfWeek = new Date(this.selectedDate);
        return Array.from({ length: 7 }, (_, i) => {
          const day = new Date(startOfWeek);
          day.setDate(startOfWeek.getDate() + i);
          return day;
        });
      },
      
    },
    methods: {
      jumpToPrevWeek() {
        let date = new Date(this.selectedDate);
  
        // Step 2: Add 7 days to the date
        date.setDate(date.getDate() - 7);
  
        // Step 3: Convert back to YYYY-MM-DD format
        this.selectedDate = date.toISOString().split('T')[0];
      },
      jumpToNextWeek() {
        let date = new Date(this.selectedDate);
  
        // Step 2: Add 7 days to the date
        date.setDate(date.getDate() + 7);
  
        // Step 3: Convert back to YYYY-MM-DD format
        this.selectedDate = date.toISOString().split('T')[0];
      },
      async fetchAllStationData() {
        await this.bookingsStore.fetchAllStationData()
      },
      handleSearchInput(e) {
        clearTimeout(this.debounceTimer)
  
        this.debounceTimer = setTimeout(() => {
          this.searchValue = e.target.value
          if(this.searchValue) {
            this.bookingsStore.loadSearchedStations(this.searchValue)
            this.showSearchResults = true
          } else this.showSearchResults = false
        }, 400)
      },
      handleSelectStation(searchedStation) {
        this.bookingsStore.setSelectedStation(searchedStation)
        this.searchValue = searchedStation.name
        if(searchedStation) {
          this.bookingsStore.getBookingDataByStation(searchedStation)
          this.selectedDate = this.formatDate(this.bookingsStore.firstBookingDateByStation)
        }
  
        this.showSearchResults = false
      },
      toggleTimeFormat() {
        this.is24HourFormat = !this.is24HourFormat;
      },
      formatHour(hour) {
        if (this.is24HourFormat) {
          return hour < 10 ? `0${hour}:00` : `${hour}:00`;
        } else {
          const period = hour < 12 ? 'AM' : 'PM';
          const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
          return `${displayHour} ${period}`;
        }
      },
      getDayName(index) {
        const day = new Date(this.selectedDate);
        day.setDate(day.getDate() + index);
        return day.toLocaleDateString('en-UK', { weekday: 'short', day: 'numeric' });
      },
      formattedDate(dateStr) {
        const date = new Date(dateStr);
  
        const options = {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        };
  
        const formattedDate = date.toLocaleDateString('en-US', options).replace(/,/g, '');
  
        return formattedDate
      },
      filteredBookings(day) {
        return this.bookingsByStation.filter(booking => {
          if(this.formattedDate(booking.startDate) === day.toDateString()) {
            booking.cardType = "pickup"
            return booking
          } else if (this.formattedDate(booking.endDate) === day.toDateString()) {
            booking.cardType = "return"
            return booking
          }
        });
      },
      calculateBookingPosition(booking) {
        
        const date = booking.cardType === 'pickup'? new Date(booking.startDate) : new Date(booking.endDate)
        const startHour = date.getHours();
        const startMinute = date.getMinutes();
        const minuteHeightRatio = 3 / 60;
  
        return {
          top: `calc(${startHour * 3}rem + ${startMinute * minuteHeightRatio}rem)`,
          left: `0`, // Adjust horizontal positioning
          right: '0',
          margin: 'auto',
        };
      },
      formatEventDateTime(date) {
        const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const timeString = date.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: !this.is24HourFormat 
        });
        return `${dateString}, ${timeString}`;
      },
      handleDragStart(booking) {
        this.draggedEvent = booking;
        this.draggedPosition = null;
      },
      handleDrag(event, booking, dayIndex) {
        if (!this.draggedEvent) return;
  
        const calendarRect = event.currentTarget.closest('.relative').getBoundingClientRect();
        const y = event.clientY - calendarRect.top;
        const hour = Math.min(23, Math.max(0, Math.floor(y / 48))); // Prevent dragging out of bounds
  
        const minute = Math.round((y % 48) / 48 * 60);
        const newDate = new Date(this.days[dayIndex]);
        newDate.setHours(hour, minute, 0, 0);
  
        this.draggedPosition = { start: newDate };
  
        // Force update of the dragged element
        const draggedElement = event.currentTarget;

        draggedElement.innerHTML = `
            <div class="text-xs">
              ${ this.formatEventDateTime(newDate)  }
            </div>
              <div class=" txt-lg">
                ${ (booking.cardType === 'pickup' ? 'Pickup by ' : 'Return by ') +  booking.customerName }
              </div>
        `;        
      },
      handleDrop(event, dayIndex, hour) {
        if (this.draggedEvent) {
          const targetDate = new Date(this.days[dayIndex]);
          const rect = event.target.getBoundingClientRect();
          const dropY = event.clientY - rect.top;
          const minutes = Math.round((dropY / rect.height) * 60);
          
          const newDate = targetDate;
          newDate.setHours(hour, minutes, 0, 0);
  
          const bookingIndex = this.bookingsByStation.findIndex(e => e.id === this.draggedEvent.id);
          if (bookingIndex !== -1) {
            if(this.draggedEvent.cardType === 'pickup')
              this.bookingsByStation[bookingIndex].startDate = newDate
            else 
              this.bookingsByStation[bookingIndex].endDate = newDate
              
            
          }
          console.log(this.bookingsByStation[bookingIndex])
          this.draggedEvent = null;
          this.draggedPosition = null;
        }
      },
      handleDragEnd(event) {
        // Reset styles and values after drag ends
        const draggedElement = event.currentTarget;
        draggedElement.style.left = '0';
      },
    }
  };
  </script>
  
  <style scoped>
  .sticky {
    position: -webkit-sticky; /* For Safari */
    position: sticky;
    z-index: 10;
  }
  
  </style>