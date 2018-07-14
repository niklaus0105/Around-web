import React from 'react';
import { AroundMarker } from "./AroundMarker"
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
import { POS_KEY } from "../constants"


class AroundMap extends React.Component {

    render() {
        const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
        // const location1={ lat: -34.397, lng: 150.644 }
        // const location2={ lat: -35.397, lng: 150.644 }
        // const postLocation = this.props.posts[0].location;
        // const location = { lat: postLocation.lat, lng: postLocation.lon}
        return (
            <GoogleMap
                defaultZoom={11}
                defaultCenter={{ lat, lng: lon }}
            >
                {this.props.posts.map((post) => <AroundMarker post={post} key={post.url}/>)}
            </GoogleMap>
        );
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));