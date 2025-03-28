import {useMap} from '@vis.gl/react-google-maps';
import React, {useEffect} from 'react';

interface Props {
    place: google.maps.places.PlaceResult | null;
}

const MapHandler = ({place}: Props) => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        if (navigator.geolocation) {
            console.log("Requesting geolocation...");
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    console.log("Geolocation success!", position);

                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };


                    map.setCenter(pos);
                    map.panTo(pos);
                },
                () => {
                 console.error("Error: The Geolocation service failed.");
                },
            );
        } else {
            // Browser doesn't support Geolocation
            console.error("Error: Your browser doesn't support geolocation.");

        }
    }, [map]);

    useEffect(() => {
        if (!map || !place) return;

        if (place.geometry?.viewport) {
            map.fitBounds(place.geometry?.viewport);
        }
    }, [map, place]);

    return null;
};

export default React.memo(MapHandler);