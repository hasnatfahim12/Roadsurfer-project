// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BookingDetailsPage from '../views/BookingDetailsPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/booking/:stationId/details/:bookingId',  // Dynamic route
    name: 'BookingDetails',
    component: BookingDetailsPage,
    props: true,  // Pass route params as props to the component
  },
  // Add more routes as needed
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
