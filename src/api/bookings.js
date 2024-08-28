import { Axios } from 'axios'

const axios = new Axios({
  baseURL: 'https://605c94c36d85de00170da8b4.mockapi.io',
  headers: {
    'Content-Type': 'application/json',
  },
})

const fetchAllStationData = async () => axios.get('/stations')
const fetchSingleBookingDetails = async (stationId, bookingId) => axios.get(`/stations/${stationId}/bookings/${bookingId}`)


export default {
    fetchAllStationData,
    fetchSingleBookingDetails
}
