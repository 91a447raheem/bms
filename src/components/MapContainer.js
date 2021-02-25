import React, { Component } from "react"
import { compose } from "recompose"
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps"

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {
    const defaultMapOptions = {
        fullscreenControl: false,
        mapTypeControl: false
    };

    return (
        <GoogleMap
            defaultZoom={7}
                   defaultOptions={defaultMapOptions}
           center={props.initialLocation!==null?{ lat:parseFloat(props.initialLocation.latitude), lng: parseFloat(props.initialLocation.longitude) }:{lat:20.5937,lng:78.9629}}
                   defaultCenter={props.initialLocation!==null?{ lat:parseFloat(props.initialLocation.latitude), lng: parseFloat(props.initialLocation.longitude) }:{lat:20.5937,lng:78.9629}} >
            {console.log("markers",props.markers)}
           {/* {props.initialLocation!==null?<Marker
                key={0}
                onClick={props.onClick.bind(this, props.initialLocation)}
                position={{lat: parseInt(props.initialLocation.latitude), lng: parseInt(props.initialLocation.longitude)}}
            >

                <InfoWindow>
                    <div>
                        {props.initialLocation.name}
                    </div>
                </InfoWindow>}

            </Marker>:null}*/}


            {props.markers.map((marker,i) => {
                const onClick = props.onClick.bind(this, marker);
                if(marker.latitude!==undefined)
                return (
                    <Marker
                        key={i}
                        onClick={onClick}
                        position={{lat: parseInt(marker.latitude), lng: parseInt(marker.longitude)}}
                    >
                        {props.selectedMarker === marker &&
                        <InfoWindow>
                            <div>
                                {marker.name}
                            </div>
                        </InfoWindow>}

                    </Marker>
                )
                else return null;
            })}

        </GoogleMap>
    )
})

export default class MapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shelters: [],
            selectedMarker: false
        }
    }
    componentDidMount() {
    }
    handleClick = (marker, event) => {
        // console.log({ marker })
        this.setState({ selectedMarker: marker });
        this.props.onClickSite(marker.name)
    };
    render() {
        return (
            <MapWithAMarker
                selectedMarker={this.state.selectedMarker}
                markers={this.props.locations}
                onClick={this.handleClick}
                initialLocation={this.props.initialLocation}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDYmr3spy8XkwGvM7vjuS_CVh-LKOJS0MU"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{height: `300px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}