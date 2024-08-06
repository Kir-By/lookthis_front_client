import {useEffect, useState} from 'react';

interface locationType {
  loaded: boolean;
  coordinates?: {lat: number; lng: number};
  error?: {code: number; message: string};
}

interface successCoordsObjType {
  latitude: number;
  longitude: number;
}

interface successLocationType {
  coords: successCoordsObjType;
}

interface errorType {
  code: number;
  message: string;
}

const useGeolocation = () => {
  const [location, setLocation] = useState<locationType>({
    loaded: false,
    coordinates: {lat: 0, lng: 0},
  });

  // success
  const onSuccess = (location: successLocationType) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  // error
  const onError = (error: errorType) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(onSuccess, onError);
    setInterval(() => {
      if (!('geolocation' in navigator)) {
        onError({
          code: 0,
          message: 'Geolocation not supported',
        });
      }
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, 30000);
  }, []);

  return location;
};

export default useGeolocation;
