import "./sidebar.css"
import {CustomMapControl} from "./map-control.tsx";
import {ControlPosition} from "@vis.gl/react-google-maps";
import MapHandler from "./map-handler.tsx";

interface SidebarProps {
    setSelectedPlace: (place: google.maps.places.PlaceResult | null) => void;
    selectedPlace: google.maps.places.PlaceResult | null;
}

export const Sidebar = ({setSelectedPlace, selectedPlace}: SidebarProps) => (
    <div className="sidebar">
        <CustomMapControl
            controlPosition={ControlPosition.TOP_LEFT}
            onPlaceSelect={setSelectedPlace}
        />
        <MapHandler place={selectedPlace}/>
    </div>
)