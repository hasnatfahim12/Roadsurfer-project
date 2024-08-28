<template>
  <div class="flex flex-col items-center justify-center space-y-4">
    <span class="text-4xl font-semibold text-black">booking details</span>
    
    <BookingCard
      :customer-name="bookingDetails?.customerName"
      :station-name="stationName"
      :start-date="formatDateWithDay(bookingDetails?.startDate)"
      :end-date="formatDateWithDay(bookingDetails?.endDate)"
      :duration="duration"
      :loading="loading"
    />
  </div>
</template>
  
<script>
import { useBookingsStore } from '../../stores/bookings'
import { useDateFormatter } from '../../composables/useDateFormatter'
import BookingCard from './_components/BookingCard.vue'

export default {
  name: 'BookingDetails',
  components: {
    BookingCard
  },
  setup() {
    const bookingsStore = useBookingsStore()
    const { formatDate, formatDateWithDay, calculateDuration } = useDateFormatter()
      
    return { bookingsStore, formatDate, formatDateWithDay, calculateDuration }
  },
  data() {
    return {
      stationName: "-"
    }
  },
  computed: {
    loading() {
      return this.bookingsStore.loading
    },
    bookingDetails() {
      return this.bookingsStore.singleBookingDetails    
    },
    duration() {
      if(this.bookingDetails) {
        const start = new Date(this.bookingDetails.startDate)
        const end = new Date(this.bookingDetails.endDate)
  
        return this.calculateDuration(start, end).days
      } else return '-'
    }
  },
  async mounted() {
    const { stationId, bookingId } = this.$route.params
      
    await this.fetchBookingDetails(stationId, bookingId)
    await this.fetchStationData(stationId)
  },
  methods: {
    async fetchBookingDetails(stationId, bookingId) {
      await this.bookingsStore.fetchSingleBookingDetails(stationId, bookingId)
    },
    async fetchStationData (stationId) {
      if(this.bookingsStore.allBookingData.length === 0) await this.bookingsStore.fetchAllStationData()
    
      this.bookingsStore.allBookingData.forEach(stationData => {
        if(stationData.id === stationId) {
          this.stationName = stationData.name
        }
      })
    
    }
  }
}
</script>
  
