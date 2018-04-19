import React from 'react';
import './List.css';
import Loading from '../common/Loading'
import { handleResponse } from '../../helper';
import { API_URL } from '../../config';
import Table from './Table';


class List extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            stations: [],
            error: null,
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        fetch(`${API_URL}/station_information`)
            .then(handleResponse)
            .then((data) => {
                this.setState({
                    stations: data.data.stations,
                    loading: false
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

        const { loading, error, stations } = this.state;

        if (loading) {
            return <div className="loading-container"><Loading /></div>
        }

        if (error) {
            return <div className="error">{error}</div>
        }

        return (
            <Table stations={stations}/>
        );
    }
}

export default List;