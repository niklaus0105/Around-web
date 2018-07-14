import React from 'react';
import { AroundMarker } from "./AroundMarker"
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';


class AroundMap extends React.Component {

    render() {
        const location1={ lat: -34.397, lng: 150.644 }
        const location2={ lat: -35.397, lng: 150.644 }
        return (
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}
            >
                <AroundMarker location={location1}/>
                <AroundMarker location={location2}/>
            </GoogleMap>
        );
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));