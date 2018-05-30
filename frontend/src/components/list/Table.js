import React from 'react';
import { withRouter } from 'react-router-dom';
import './Table.css';
import { Table } from 'semantic-ui-react'


const TableStation = (props) => {
    const { stations, history } = props;
    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Estação</Table.HeaderCell>
                    <Table.HeaderCell>Endereço</Table.HeaderCell>
                    <Table.HeaderCell>Capacidade</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {stations.map((station) => (
                    <Table.Row
                        key={station.station_id}
                        onClick={() => history.push(`/station/${station.station_id}`)}
                        >
                        <Table.Cell>
                            <span className="Table-rank">{station.station_id}</span>
                            {station.name.replace(/\d+|^\s+|-|\s+$/g, '')}
                        </Table.Cell>
                        <Table.Cell>
                            {station.address}
                        </Table.Cell>
                        <Table.Cell>
                            {station.capacity}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}

export default withRouter(TableStation);