import React from 'react';
import {API_URL} from '../../config';
import {handleResponse} from '../../helper';
import Loading from '../common/Loading';
import Chart from '../chart/Chart';
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
        const stationID = parseInt(this.props.match.params.station_id);

        this.setState({loading: true});

        fetch(`${API_URL}/station_status`)
            .then(handleResponse)
            .then((response) => {
                let stations = response.data.stations
                const stationData = stations.filter(station => station.station_id === stationID);
                console.log(stationData[0].station_id);
                console.log(stationID);
                this.setState({loading: false, error: null, station: stationData[0]});
                console.log(this.state)
            })
            .catch((error) => {
                console.log('error', error)
            })
    }
    render() {
        const {loading, station} = this.state;

        if (loading) {
            return <div className="loading-container"><Loading /></div>
        }

        return (
            <div className="Detail">
                <h1 className="Detail-heading">
                    Estação:{station.station_id}
                </h1>

                <div className="Detail-container">
                    <div className="Detail-item">
                        Bicicletas Disponiveis
                        <span className="Detail-value">
                        {station.num_bikes_available}
                        </span>
                    </div>
                    <div className="Detail-item">
                        Vagas Disponiveis
                        <span className="Detail-value">
                        {station.num_docks_available}
                        </span>
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">Bicicletas alugadas nas ultimas 24H</span>
                        <Chart />
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail;