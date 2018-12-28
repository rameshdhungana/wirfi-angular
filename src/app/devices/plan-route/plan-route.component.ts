import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../_services/dashboard.service";

@Component({
    selector: 'app-plan-route',
    templateUrl: './plan-route.component.html',
    styleUrls: ['./plan-route.component.css']
})
export class PlanRouteComponent implements OnInit {
    lat: number = 26.890959;
    lng: number = -80.116577;
    planRouteLatLngList = [];
    routeCounter = [];
    public deviceLocations;
    public getDirectionButtonClicked = false;


    constructor(private dashBoardSerVice: DashboardService) {
    }

    ngOnInit() {

        this.dashBoardSerVice.getDeviceLocation().subscribe(locationResponse => {
            this.deviceLocations = locationResponse;
            console.log('this is the list of the devices loccation', this.deviceLocations);


        })
    }

    addPointToPlanRoute(location, index) {

        if (this.planRouteLatLngList.length < this.deviceLocations.length) {
            console.log(location);
            const index = this.planRouteLatLngList.findIndex(x => x.lat == location.latitude && x.lng == location.longitude);
            console.log('this is index to check if the location already exits in array', index);
            if (index === -1) {

                this.planRouteLatLngList.push({lat: location.latitude, lng: location.longitude});
                if (this.planRouteLatLngList.length > 1) {
                    this.routeCounter.push(this.planRouteLatLngList.length - 2);
                }

            } else {

                this.planRouteLatLngList.splice(index, 1);
                this.routeCounter.pop();
            }

            console.log(this.routeCounter, 'this is couter coutn');

            if (this.planRouteLatLngList.length > 1) {
                for (let index of this.routeCounter) {
                    console.log('inside route loop origin', index, this.planRouteLatLngList[index]);
                    console.log('inside route loop destination', index + 1, this.planRouteLatLngList[index + 1])
                }
            }


            console.log(this.planRouteLatLngList);


        }
    }

    getDirection() {
        this.getDirectionButtonClicked = true;
    }

}
