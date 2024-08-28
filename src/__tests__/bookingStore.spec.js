// __tests__/bookingStore.spec.js
import { setActivePinia, createPinia } from 'pinia';
import { useBookingsStore } from '@/stores/bookings';
import repository from '@/api/bookings';

// Mock the repository
jest.mock('@/api/bookings');

describe('Bookings Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('initializes with correct state', () => {
    const store = useBookingsStore();
    expect(store.loading).toBe(false);
    expect(store.stationsList).toEqual([]);
    expect(store.allBookingData).toEqual([]);
    expect(store.bookingLists).toEqual([]);
    expect(store.bookingsByStations).toEqual([]);
    expect(store.singleBookingDetails).toBeNull();
    expect(store.firstBookingDateByStation).toBeNull();
  });

  it('fetchAllStationData sets loading and updates state', async () => {
    const store = useBookingsStore();

    const mockResponse = {
      status: 200,
      data: JSON.stringify([{ id: 1, name: 'Station A' }, { id: 2, name: 'Station B' }])
    };

    repository.fetchAllStationData.mockResolvedValueOnce(mockResponse);

    await store.fetchAllStationData();

    expect(store.loading).toBe(false);
    expect(store.allBookingData).toEqual([{ id: 1, name: 'Station A' }, { id: 2, name: 'Station B' }]);
  });

  it('fetchAllStationData handles errors', async () => {
    const store = useBookingsStore();
    repository.fetchAllStationData.mockRejectedValueOnce(new Error('Network Error'));

    await store.fetchAllStationData();

    expect(store.loading).toBe(false);
    expect(store.allBookingData).toEqual([]);
  });

  it('loadSearchedStations returns filtered stations', () => {
    const store = useBookingsStore();
    store.allBookingData = [
      { id: 1, name: 'Central Station' },
      { id: 2, name: 'West Station' },
      { id: 3, name: 'North Station' }
    ];

    store.loadSearchedStations('Central');

    expect(store.stationsList).toEqual([{ id: 1, name: 'Central Station' }]);
  });

  it('getBookingDataByStation filters bookings correctly', () => {
    const store = useBookingsStore();
    store.allBookingData = [
      {
        id: 1,
        name: 'Central Station',
        bookings: [
          { id: 101, startDate: '2021-07-12', endDate: '2021-07-13' },
          { id: 102, startDate: '2021-07-14', endDate: '2021-07-15' }
        ]
      },
      {
        id: 2,
        name: 'West Station',
        bookings: [{ id: 201, startDate: '2021-07-12', endDate: '2021-07-13' }]
      }
    ];

    store.getBookingDataByStation({ id: 1 });

    expect(store.bookingsByStations).toEqual([
      { id: 101, startDate: '2021-07-12', endDate: '2021-07-13' },
      { id: 102, startDate: '2021-07-14', endDate: '2021-07-15' }
    ]);
  });

  it('fetchSingleBookingDetails sets singleBookingDetails correctly', async () => {
    const store = useBookingsStore();

    const mockResponse = {
      status: 200,
      data: JSON.stringify({ id: 101, startDate: '2021-07-12', endDate: '2021-07-13' })
    };

    repository.fetchSingleBookingDetails.mockResolvedValueOnce(mockResponse);

    await store.fetchSingleBookingDetails(1, 101);

    expect(store.loading).toBe(false);
    expect(store.singleBookingDetails).toEqual({ id: 101, startDate: '2021-07-12', endDate: '2021-07-13' });
  });

  it('dateOfFirstBooking correctly finds the earliest date', () => {
    const store = useBookingsStore();

    store.bookingsByStations = [
      { id: 101, startDate: '2021-07-14', endDate: '2021-07-15' },
      { id: 102, startDate: '2021-07-12', endDate: '2021-07-13' }
    ];

    store.dateOfFirstBooking();

    expect(store.firstBookingDateByStation).toEqual(new Date('2021-07-12'));
  });
});
