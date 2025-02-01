import './App.css'
import {APIProvider, Map, ControlPosition, AdvancedMarker} from '@vis.gl/react-google-maps';
import MapHandler from "./map-handler.tsx";
import {useEffect, useState} from "react";
import {CustomMapControl} from "./map-control.tsx";
import {MarkerWithInfoWindow} from './marker-info-window.tsx';
import {getPlacesByUser} from "./api/places.ts";



//TODO:
// * Update database and queries using list schema
// * Get user location
// * Set places on load within bounds of user location
// * Save new place from info window


interface Place {
    place_id: number;
    name: string;
    formatted_address: string;
    lat: number;
    lng: number;
}

function App() {
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
    const [userPlaces, setUserPlaces] = useState<Place[]>([]);

    const loadPlaces = async () => {
        await getPlacesByUser().then(places => {
             setUserPlaces(places);
            console.log(places);
            console.log('userPlaces', userPlaces);
        }).catch(error => console.error(error));
    }
    useEffect(() => {
        loadPlaces();
    }, [])

    return (
        <div>
            <APIProvider apiKey={import.meta.env.GOOGLE_MAPS_API_KEY}>
                    <div className="sidebar">
                            this is a sidebar
                    </div>

                <Map
                    style={{width: '100vw', height: '100vh', padding: '0px'}}
                    defaultCenter={{lat: 42.3601, lng: -71.0589}}
                    defaultZoom={15}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    // mapId={import.meta.env.GOOGLE_MAPS_MAP_ID}
                    mapId="3bc9b9cc9c484b9d"
                />

                <CustomMapControl
                    controlPosition={ControlPosition.TOP}
                    onPlaceSelect={setSelectedPlace}
                />
                <MapHandler place={selectedPlace}/>

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

            </APIProvider>
        </div>

    )
}

export default App
