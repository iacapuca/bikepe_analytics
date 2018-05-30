import React from 'react';
import {Line} from 'react-chartjs-2';

class Chart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            chartData:{
                labels: ['01','02','03','04'],
                datasets:[{
                    label:'Bicicletas',
                    data:[14,14,14],
                    backgroundColor:'rgba(255,99,132,0.6)',
                }],
                backgroundColor:[
                    'rgba(255,99,132,0.6)',
                    'rgba(54,162,235,0.6)',
                ],
            }
        }
    }

    render() {
        return (
            <div className='chart'>
                <Line 
                data={this.state.chartData} 
                options={{
                    maintainAspectRatio: false,
                    legend:{
                        labels:{
                            fontColor: '#ffffff',
                        }
                    }
                }}
                />
            </div>
        )
    }
}

export default Chart;
