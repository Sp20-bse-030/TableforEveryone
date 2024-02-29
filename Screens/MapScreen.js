import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Platform, Alert, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import * as geolib from 'geolib';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, request } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import ip from '../Ip'

Geocoder.init("AIzaSyCA1VPGrtGVdbdTLQ5_fYsG2JTrPaY93fM"); // Replace with your Google Maps API key

const predefinedLocations = [
  { id: 1, title: 'Monal', latitude: 33.6560, longitude: 73.1600 },
  { id: 2, title: 'Cheezious', latitude: 33.6600, longitude: 73.1600 },
  { id: 3, title: 'TKR', latitude: 33.6620, longitude: 73.1620 },
  { id: 4, title: 'KFC', latitude: 33.6580, longitude: 73.1570 },
  { id: 5, title: 'Mcdonalds', latitude: 33.6600, longitude: 73.1570 },
  // Add more predefined locations as needed
];

const MapScreen = () => {
  const [region, setRegion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null); // Store user's current location
  const [tappedLocation, setTappedLocation] = useState(null); // Store location tapped by the user
  const [distance, setDistance] = useState(null); // Store minimum distance
  const [duration, setDuration] = useState(null); 
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [nearbyrest, setNearbyrest] = useState([]);// Store minimum duration
  const navigation = useNavigation();
  

  // const handlegotoRestaurant = () => {
  //   navigation.navigate('Home');
  // };

  axios
  .get(`http:/${ip}:8000/NearbyLocations`)
  .then((response)=>{
   
    setNearbyrest(response.data);
  })
  .catch((error)=>{
    console.error("error fetching details", error)
  })

  const handlegotoRestaurant = (nearbyRestaurants) => {
    navigation.navigate('Home', { nearbyRestaurants }); // Pass nearby restaurants data
  };
  const handleMapRegionChange = (newRegion) => {
    setRegion(newRegion);
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

      const status = await request(permission);

      if (status === 'granted') {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const newRegion = {
              latitude,
              longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            };
            setRegion(newRegion);

            // Store user's current location
            setUserLocation({
              latitude,
              longitude,
            });
          },
          (error) => {
            console.error('Error getting location:', error);
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      } else if (status === 'blocked') {
        const defaultRegion = {
          latitude: 33.6844,
          longitude: 73.0479,
          latitudeDelta: 0,
          longitudeDelta: 0,
        };
        setRegion(defaultRegion);
        Alert.alert(
          'Location Permission Required',
          'Please enable location access in your device settings to see your current location.',
          [
            {
              text: 'OK',
              onPress: () => {},
            },
          ],
          { cancelable: false }
        );
      }
    };

    requestLocationPermission();
  }, []);
  const findNearbyLocations = () => {
    if (userLocation){
      const nearby = nearbyrest.filter(location => {
        const distance = geolib.getDistance(
          { latitude: userLocation.latitude, longitude: userLocation.longitude },
          { latitude: location.latitude, longitude: location.longitude }
        );
        return distance <= 500; // Filter locations within 1000 meters
      });
      setNearbyLocations(nearby);
    }
  };
  useEffect(() => {
    findNearbyLocations();
  }, [userLocation]);

  const handleDistanceCalculation = (location1, location2) => {
    const coords1 = { latitude: location1.latitude, longitude: location1.longitude };
    const coords2 = { latitude: location2.latitude, longitude: location2.longitude };
    
    const calculatedDistance = geolib.getDistance(coords1, coords2);
    return calculatedDistance;
  };
  const calculateDistanceBetweenPredefinedLocations = () => {
    if (nearbyrest.length >= 2) {
      const location1 = nearbyrest[0];
      const location2 = nearbyrest[1];

      const distance = handleDistanceCalculation(location1, location2);
      setDistance(distance);
    }
  };


  useEffect(() => {
    if (userLocation && tappedLocation) {
      // Calculate directions using Google Maps Directions API
      const origin = `${userLocation.latitude},${userLocation.longitude}`;
      const destination = `${tappedLocation.latitude},${tappedLocation.longitude}`;
      const apiKey = 'AIzaSyCA1VPGrtGVdbdTLQ5_fYsG2JTrPaY93fM';
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;
  
      axios
        .get(url)
        .then((response) => {
          const route = response.data.routes[0];
          if (route && route.legs && route.legs[0]) {
            const { distance, duration } = route.legs[0];
            setDistance(distance.text);
            setDuration(duration.text);
          } else {
            // Handle the case where the route or legs are undefined
            console.error('Invalid API response:', response.data);
          }
        })
        .catch((error) => {
          console.error('Error calculating directions:', error);
        });
    }
  }, [userLocation, tappedLocation]);
  useEffect(() => {
    calculateDistanceBetweenPredefinedLocations();
  }, []);
  

  const handleSearch = async () => {
    try {
      const result = await Geocoder.from(searchQuery);
      const { lat, lng } = result.results[0].geometry.location;
      const newRegion = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setRegion(newRegion);
      setTappedLocation({
        latitude: lat,
        longitude: lng,
      });
    } catch (error) {
      console.error('Error searching for location:', error);
    }
  };
  const handleNavigateToPage = (nearbyRestaurants) => {
    navigation.navigate('Home', { nearbyRestaurants }); // Pass nearby restaurants data
  };

  return (
    <View style={{ flex: 1 }}>
      {region && (
        <MapView
          style={{ flex: 1 }}
          region={region}
          onRegionChangeComplete={handleMapRegionChange}
          gestureRecognizers={{ pinchZoom: true }}
          onPress={(e) => {
            // Handle user tapping on the map
            const { latitude, longitude } = e.nativeEvent.coordinate;
            const tappedLocation = predefinedLocations.find(
              (location) => location.latitude === latitude && location.longitude === longitude
            );
            if (tappedLocation) {
              const nearbyRestaurants = predefinedLocations.filter(location => {
                const distance = geolib.getDistance(
                  { latitude, longitude },
                  { latitude: location.latitude, longitude: location.longitude }
                );
                return distance <= 500; // Filter locations within 500 meters
              });
              handleNavigateToPage(nearbyRestaurants);
            }
          }}
         
        >
          {userLocation && (
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              title="Your Location"
              pinColor="red" // Change marker color if needed
            />
          )}
          {tappedLocation && (
            <Marker
              coordinate={{
                latitude: tappedLocation.latitude,
                longitude: tappedLocation.longitude,
              }}
              title="Tapped Location"
              pinColor="green" // Change marker color if needed
            />
          )}
          {nearbyrest.map((location) => (
            <Marker
              key={location.id}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={location.name}
              pinColor="blue"
            />
          ))}
        </MapView>
      )}
      <View>
        <TextInput
          placeholder="Search for a location"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
       
      </View>
      
      {nearbyLocations.length > 0 && (
        <View>
          <Text>Recommended locations</Text>
          {nearbyLocations.map(location => (
            <Text key={location.id}>{location.name}</Text>
          ))}
        </View>
      )}
      <Button title="Go To" 
      onPress={() => handlegotoRestaurant(nearbyLocations)} />
    </View>
  );
};

export default MapScreen;
