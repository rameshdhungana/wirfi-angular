import {Injectable} from '@angular/core';

@Injectable()
export class GetCurrentLocationService {

    constructor() {
    }

    getCurrentLocation() {
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(showPosition.bind(this));


        } else {
            console.log("Geolocation is not supported by this browser.");
        }

        function showPosition(position) {
            console.log('latitude', position.coords.latitude);
            console.log('longitude', position.coords.longitude);
            if (typeof(position.coords.latitude) === "number") {
                console.log('it is number')
            }
            this.currentLatitude = position.coords.latitude;
            this.currentLongitude = position.coords.longitude;
            console.log(this.currentLatitude, this.currentLongitude)
        }
        return true


    }
}
