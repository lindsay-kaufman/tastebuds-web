import './App.css'
import {APIProvider, Map, ControlPosition, AdvancedMarker} from '@vis.gl/react-google-maps';
import MapHandler from "./map-handler.tsx";
import {useState, useEffect} from "react";
import {CustomMapControl} from "./map-control.tsx";
import { MarkerWithInfoWindow } from './marker-info-window.tsx';


function App() {
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);

    return (
        <>
            <h1>Tastebuds</h1>
            <APIProvider apiKey={import.meta.env.GOOGLE_MAPS_API_KEY}>
                <Map
                    style={{width: '75vw', height: '75vh'}}
                    defaultCenter={{lat: 42.3601, lng: -71.0589}}
                    defaultZoom={15}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                     mapId={import.meta.env.GOOGLE_MAPS_MAP_ID}
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
            </APIProvider>
        </>
    )
}

export default App
