import React from 'react'
import { Marker, InfoWindow } from 'react-google-maps'

export class AroundMarker extends React.Component {

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
            <Marker
                position={this.props.location}
                onClick={this.onToggleOpen}
            >
                {this.state.isOpen ? <InfoWindow>
                    <div>Hi</div>
                </InfoWindow> : null}
            </Marker>
        );
    }
}