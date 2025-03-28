import './App.css'
import {APIProvider, Map, ControlPosition, AdvancedMarker} from '@vis.gl/react-google-maps';
import MapHandler from "./map-handler.tsx";
import { useEffect, useState} from "react";
import {CustomMapControl} from "./map-control.tsx";
import {MarkerWithInfoWindow} from './marker-info-window.tsx';
import {getPlacesByUser} from "./api/places.ts";
import {Sidebar} from "./sidebar.tsx";

interface Place {
    place_id: number;
    name: string;
    formatted_address: string;
    lat: number;
    lng: number;
}

export const App = () => {
    const defaultMapPosition = {lat: 42.3601, lng: -71.0589} //Boston
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
    const [userPlaces, setUserPlaces] = useState<Place[]>([]);

    const loadPlaces = async () => {
        await getPlacesByUser().then(places => {
            setUserPlaces(places);
        }).catch(error => console.error(error));
    }

    useEffect(() => {
        loadPlaces();
    }, [])

    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
            <Map
                style={{width: '100vw', height: '100vh', padding: '0px'}}
                defaultCenter={defaultMapPosition}
                defaultZoom={12}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
            />
            <CustomMapControl
                controlPosition={ControlPosition.TOP}
                onPlaceSelect={setSelectedPlace}
            />
            <MapHandler place={selectedPlace} />

            {selectedPlace && (
                <MarkerWithInfoWindow
                    place={selectedPlace}
                    onPlaceSelect={setSelectedPlace}
                />
            )}

            {userPlaces.length > 0 && userPlaces.map(place => (
                    <AdvancedMarker
                        key={place.place_id}
                        title={place.name}
                        position={{lat: place.lat, lng: place.lng}}
                    />
                )
            )}
            <Sidebar />
        </APIProvider>
    )
}

export default App
