import * as Location from 'expo-location';
import { setLocation, setAddress } from '../Redux/locationSlice';


export const getCurrentLocation = async (dispatch) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("Please grant location permissions");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    dispatch(setLocation(currentLocation));
    // console.log("Location:");
    // console.log(currentLocation);

    reverseGeocode(currentLocation, dispatch);
  };

export const reverseGeocode = async (location, dispatch) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("Please grant location permissions");
      return;
    }
  
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude
    });
  
    // console.log("Reverse Geocoded:");
    // console.log(reverseGeocodedAddress);
 
    if (reverseGeocodedAddress && reverseGeocodedAddress.length > 0) {
      const firstAddress = reverseGeocodedAddress[0];
      const formattedAddress = `${firstAddress.name}, ${firstAddress.street}, ${firstAddress.city}, ${firstAddress.region}, ${firstAddress.country}`;
      dispatch(setAddress(formattedAddress));
  
      // navigation.navigate('Info'); // Uncomment this line if needed
    }
  };