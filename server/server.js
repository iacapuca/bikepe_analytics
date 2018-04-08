var wedeploy = require('wedeploy');

function isServiceHour(){
    var now = new Date();
    var recifeTime = new Date(now.valueOf() + now.getTimezoneOffset() * 60000 - 180 * 60000);
    console.log('Recife time: ' + recifeTime);

    if (now.getHours() >= 5 && now.getHours() < 23) {
        return true;
    }
    else {
        console.log("Don't logged at " + recifeTime);
        return false;
    }
}

function getStatus() {
    if (!isServiceHour()) {
        return;
    }

    wedeploy
        .data('https://rec.publicbikesystem.net')
        .get('ube/gbfs/v1/en/station_status')
        .then(function(result) {
            var stations = result.data.stations;
            var bikes_available = 0;
            var docks_available = 0;
            
            for(var i in stations) { 
                bikes_available += stations[i].num_bikes_available; 
                docks_available += stations[i].num_docks_available; 
            }

            wedeploy
                .data('https://bikepe-bikeanalytics.wedeploy.io')
                .create('history', {
                    "timestamp": result.last_updated,
                    "stations": stations,
                    "bikes_available": bikes_available,
                    "docks_available": docks_available
                })
                .then(function(recorded){
                    console.log(result.last_updated + " recorded");
                });
        });

    // wedeploy.data('https://bikepe-bikeanalytics.wedeploy.io')
    // .delete('history');
}

// Get bike stations status every 5 minutes
// getStatus();
const every5minsInterval = setInterval(getStatus, 300000);