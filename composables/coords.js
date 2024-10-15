
import { useProfileStore } from "~~/stores/profileStore";


const useCoords = (data,field)=>{
  
const profileStore = useProfileStore();
const { clearProfileData, setCoordinates } = profileStore;
    let timezone = ref()
    let latitude  = ref()
    let longitude  = ref()
    let locationError = ref()
    
    if (process.client) {
        // get geolocation
        timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log(latitude, longitude, timezone)
            // profileStore.setCoordinates(latitude, longitude, timezone);
            latitude.value = latitude
            longitude.value = longitude
      
          },
          (error) => {
            locationError.value = error;
          }
        );
      }


    return {
        timezone,
        latitude,
        longitude,
        locationError
    }

}

export default useCoords