import  {useEffect, useState} from 'react';
import {
    AdvancedMarker,
    InfoWindow,
    useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';

interface MarkerInfoProps {
    place: google.maps.places.PlaceResult;
    onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

export const MarkerWithInfoWindow = ({place, onPlaceSelect}: MarkerInfoProps) => {
    const [infowindowOpen, setInfowindowOpen] = useState(true);
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [latLng, setLatLng] = useState<google.maps.LatLng | null>(null);

   useEffect(() => {
       if (place.geometry?.location) {
           setLatLng(place.geometry?.location)
       }
   }, [])

    return latLng && (
        <>
            <AdvancedMarker
                ref={markerRef}
                onClick={() => setInfowindowOpen(true)}
                position={{lat: latLng.lat(), lng: latLng.lng() }}
                title={place.name}
            />
            {infowindowOpen && (
                <InfoWindow
                    anchor={marker}
                    maxWidth={200}
                    onCloseClick={() => {
                        setInfowindowOpen(false)
                        onPlaceSelect(null)
                    }}
                >
                <div>{place.name}</div>
                </InfoWindow>
            )}
        </>
    );
};