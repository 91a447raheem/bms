import React from 'react';
import GoogleMapReact from 'google-map-react';

const GoogleMap = () => {
    let lat = 0
    let lng = 0
    const center = {
        lat: 59.95,
        lng: 30.33
    }

    return (<div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={center}
            defaultZoom={11}
        >
            BMS Marker
        </GoogleMapReact>
    </div>);
}

export default GoogleMap;