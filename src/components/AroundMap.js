import React from 'react';
import { GoogleMap, Marker, InfoWindow, withScriptjs, withGoogleMap } from 'react-google-maps';
class AroundMap extends React.Component {
    state = {
        isOpen: false,
    }

    onToggleOpen = () => {
        this.setState((prevState) => {
            return {
                isOpen: !prevState.isOpen,
            }
        });
    }
    render() {
        return (
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}
            >
                <Marker
                    position={{ lat: -34.397, lng: 150.644 }}
                    onClick={this.onToggleOpen}
                >
                    {this.state.isOpen ? <InfoWindow>
                        <div>Hi</div>
                    </InfoWindow> : null}
                </Marker>
            </GoogleMap>
        );
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));