import './App.css'
import {APIProvider, Map} from '@vis.gl/react-google-maps';

function App() {
    return (
        <>
            <h1>Tastebuds</h1>
            <APIProvider apiKey={import.meta.env.GOOGLE_API_KEY}>
                <Map
                    style={{width: '75vw', height: '75vh'}}
                    defaultCenter={{lat: 42.3601, lng: -71.0589}}
                    defaultZoom={15}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                />
            </APIProvider>
        </>
    )
}

export default App
