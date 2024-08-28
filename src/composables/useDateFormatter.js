// src/composables/useDateFormatter.js

export function useDateFormatter() {
   
    
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        return date.toLocaleDateString(undefined, options);
    };
    
    const formatDateWithDay = (dateStr) => {
      const date = new Date(dateStr);
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' };
      return date.toLocaleDateString(undefined, options);
    };

    //Format date with only month and year
    const formatDateShort = (dateStr) => {
        const date = new Date(dateStr);
        const options = { month: 'short', year: 'numeric' };
        console.log('test date', date.toLocaleDateString(undefined, options))
        return date.toLocaleDateString(undefined, options);
    } 

    const calculateDuration = (startDate, endDate) => {
      const durationInMs = endDate - startDate;
  
      const millisecondsInSecond = 1000;
      const millisecondsInMinute = millisecondsInSecond * 60;
      const millisecondsInHour = millisecondsInMinute * 60;
      const millisecondsInDay = millisecondsInHour * 24;
  
      const days = Math.floor(durationInMs / millisecondsInDay);
      const hours = Math.floor((durationInMs % millisecondsInDay) / millisecondsInHour);
      const minutes = Math.floor((durationInMs % millisecondsInHour) / millisecondsInMinute);
      const seconds = Math.floor((durationInMs % millisecondsInMinute) / millisecondsInSecond);
  
      return { days, hours, minutes, seconds };
    };
  
    return {
      formatDate,
      formatDateWithDay,
      formatDateShort,
      calculateDuration,
    };
  }
  