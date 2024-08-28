import { defineStore } from 'pinia';
import repository from '../api/bookings.js'
export const useBookingsStore = defineStore('bookings', {
  state: () => ({
    loading: false,
    stationsList: [],
    allBookingData: [],
    bookingLists: [],
    bookingsByStations: [],
    selectedStation: null,
    singleBookingDetails: null,
    firstBookingDateByStation: null
  }),
  actions: {
    async fetchAllStationData() {
      this.loading = true
      try {
        const response = await repository.fetchAllStationData()
        if(response.status === 200 && response.data) {
          this.allBookingData = [...JSON.parse(response.data)]
          console.log('test response', this.allBookingData)
          
        }
      } catch (e) {
        alert('Something went wrong! Please try again.')
        console.log(e)
      } finally {
        this.loading = false
      }      
    },
    loadSearchedStations(searchTerm) {
      if(searchTerm === '') return []
      let _stationLists = [];
      searchTerm = searchTerm.toLowerCase();
    
      // Separate arrays for prioritization
      let startsWithSearchTerm = [];
      let containsSearchTerm = [];
    
      this.allBookingData.forEach(item => {
        const stationName = item.name.toLowerCase();
        if (stationName.startsWith(searchTerm)) {
          startsWithSearchTerm.push({ id: item.id, name: item.name });
        } else if (stationName.includes(searchTerm)) {
          containsSearchTerm.push({ id: item.id, name: item.name });
        }
      });
    
      _stationLists = [...startsWithSearchTerm, ...containsSearchTerm];
    
      console.log('test station list', _stationLists);
      this.stationsList = _stationLists;
    },
    
    getBookingDataByStation(station) {
      this.bookingsByStations = this.allBookingData.filter(booking => booking.id === station.id)[0].bookings
      this.dateOfFirstBooking(station)
      
    },
    async fetchSingleBookingDetails(stationId, bookingId) {
      this.loading = true
      try {
        const response = await repository.fetchSingleBookingDetails(stationId, bookingId)
        if(response.status === 200 && response.data) {
          this.singleBookingDetails = JSON.parse(response.data)
          console.log('test response', response.data)
          
        }
      } catch (e) {
        alert('Something went wrong! Please try again.')
        console.log(e)
      } finally {
        this.loading = false
      }      
    },
    dateOfFirstBooking() {
      let firstBookingDate = new Date(this.bookingsByStations[0].startDate)

      this.bookingsByStations.map(booking => {
        let startDate = new Date(booking.startDate)
        let endDate = new Date(booking.endDate)

        if(firstBookingDate > startDate) firstBookingDate = startDate
        if(firstBookingDate > endDate) firstBookingDate = endDate
        
      })

      this.firstBookingDateByStation = firstBookingDate
    },
    setSelectedStation(station) {
      this.selectedStation = station
    }
  },
});
