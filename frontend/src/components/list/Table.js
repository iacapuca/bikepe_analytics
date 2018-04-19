import React from 'react';
import { withRouter } from 'react-router-dom';
import './Table.css';

const Table = (props) => {
    const { stations, history } = props;
    return (
        <div className='Table-container'>
        <table className="Table">
            <thead className="Table-head">
                <tr>
                    <th>Estação</th>
                    <th>Endereço</th>
                    <th>Capacidade</th>
                </tr>
            </thead>
            <tbody className="Table-body">
            {stations.map((station) => (
            <tr 
            key={station.station_id}
            onClick={() => history.push(`/station/${station.station_id}`)}
            >
                <td>
                    <span className="Table-rank">{station.station_id}</span>
                        {station.name.replace(/\d+|^\s+|-|\s+$/g,'')}
                </td>
                <td>
                    {station.address}
                </td>
                <td>
                    {station.capacity}
                </td>
            </tr>
        ))}
            </tbody>
        </table>
    </div>
    );
}

export default withRouter(Table);