import React from 'react';
import {API_URL} from '../../config';
import {handleResponse} from '../../helper';
import './Detail.css';

class Detail extends React.Component {
    constructor() {
        super();

        this.state = {
            station: {},
            loading: false,
            error: null
        };
    }

    componentDidMount() {
        const stationID = this.props.match.params.station_id;

        this.setState({loading: true});

        fetch(`${API_URL}/station_status`)
            .then(handleResponse)
            .then((response) => {
                let stations = response.data.stations
                const stationData = stations.filter(station => station.station_id === 1);
                console.log(stationData);
                console.log(stationID);
                this.setState({loading: false, error: null, station: stationData});
            })
            .catch((error) => {
                console.log('error', error)
            })
    }
    render() {
        const {station} = this.state;

        return (
            <div className="Detail">
                <h1 className="Detail-heading">
                    Teste:{station.station_id}
                </h1>

                <div className="Detail-container">
                    <div className="Detail-item">
                        Price
                        <span className="Detail-value">$
                        </span>
                    </div>
                    <div className="Detail-item">
                        Rank
                        <span className="Detail-value">teste</span>
                    </div>
                    <div className="Detail-item">
                        24H Change
                        <span className="Detail-value">não</span>
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">Market cap</span>
                        <span className="Detail-dollar">$</span>
                        Teste
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">24H Volume</span>
                        <span className="Detail-dollar">$</span>
                        1
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">Total supply</span>
                        42
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail;