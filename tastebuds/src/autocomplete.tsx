import {useEffect, useState, useCallback, FormEvent} from 'react';
import {useMap, useMapsLibrary} from '@vis.gl/react-google-maps';
import './autocomplete.css';

interface Props {
    onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

export const AutocompleteCustom = ({onPlaceSelect}: Props) => {
    const map = useMap();
    const places = useMapsLibrary('places');

    const [sessionToken, setSessionToken] =
        useState<google.maps.places.AutocompleteSessionToken>();

    const [autocompleteService, setAutocompleteService] =
        useState<google.maps.places.AutocompleteService | null>(null);

    const [placesService, setPlacesService] =
        useState<google.maps.places.PlacesService | null>(null);

    const [predictionResults, setPredictionResults] = useState<
        Array<google.maps.places.AutocompletePrediction>
    >([]);

    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        if (!places || !map) {
            console.log(`No (${places}) places or (${map}) map found.`);
            return;
        }

        setAutocompleteService(new places.AutocompleteService());
        setPlacesService(new places.PlacesService(map));
        setSessionToken(new places.AutocompleteSessionToken());

        return () => setAutocompleteService(null);
    }, [map, places]);

    const fetchPredictions = useCallback(
        async (inputValue: string) => {
            if (!autocompleteService || !inputValue) {
                setPredictionResults([]);
                return;
            }

            const request = {input: inputValue, sessionToken};
            const response = await autocompleteService.getPlacePredictions(request);

            setPredictionResults(response.predictions);
        },
        [autocompleteService, sessionToken]
    );

    const onInputChange = useCallback(
        (event: FormEvent<HTMLInputElement>) => {
            const value = (event.target as HTMLInputElement)?.value;

            setInputValue(value);
            fetchPredictions(value);
        },
        [fetchPredictions]
    );

    const handleSuggestionClick = useCallback(
        (placeId: string) => {
            if (!places) return;

            const detailRequestOptions = {
                placeId,
                fields: ['place_id', 'geometry', 'name', 'formatted_address'],
                sessionToken
            };

            const detailsRequestCallback = (
                placeDetails: google.maps.places.PlaceResult | null
            ) => {
                onPlaceSelect(placeDetails);
                console.log('place details: ', placeDetails);
                setPredictionResults([]);
                setInputValue(placeDetails?.formatted_address ?? '');
                setSessionToken(new places.AutocompleteSessionToken());
            };

            placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
        },
        [onPlaceSelect, places, placesService, sessionToken]
    );

    return (
        <div className="autocomplete-container">
            <input
                value={inputValue}
                onInput={(event: FormEvent<HTMLInputElement>) => onInputChange(event)}
                placeholder="Search for a place"
                style={{ width: '25vw' }}
            />

            {predictionResults.length > 0 && (
                <ul className="autocomplete-list">
                    {predictionResults.map(({place_id, description}) => {
                        return (
                            <li
                                key={place_id}
                                className="autocomplete-list-item"
                                onClick={() => handleSuggestionClick(place_id)}>
                                {description}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};