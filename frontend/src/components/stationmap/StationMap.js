import React from 'react';
import './StationMap.css';
import Loading from '../common/Loading'
import { API_URL } from '../../config';
import { handleResponse } from '../../helper';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'

class StationMap extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            error: null,
            markers: [],
            lat: -8.0575976,
            lng: -34.9262359,
            zoom: 13
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        fetch(`${API_URL}/station_information`)
            .then(handleResponse)
            .then((data) => {
                this.setState({
                    loading: false,
                    markers: data.data.stations
                });
            })
            .catch((error) => {
                this.setState({
                    error: error.errorMessage,
                    loading: false
                });
            });
    }
    render() {
        const { loading, error, markers, position = [this.state.lat, this.state.lng], zoom=[this.state.zoom] } = this.state;

        if (loading) {
            return <div className="loading-container"><Loading /></div>
        }

        if (error) {
            return <div className="error">{error}</div>
        }

        return (
            <Map center={position} zoom={zoom}>
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    {markers.map((marker) => (
                <Marker key={marker.station_id} position={{lat:marker.lat, lng:marker.lon}}>
                    <Popup>
                        <span>
                            {marker.name}
                            <br/>
                            Capacidade: {marker.capacity}
                        </span>
                    </Popup>
                </Marker>
                    ))}
            </Map>
        )

    }

}

export default StationMap;