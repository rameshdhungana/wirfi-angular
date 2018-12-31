import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../_services/dashboard.service";
import {BehaviorSubject, Subject} from "rxjs/Rx";

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
    public deviceLocationList: any;
    public deviceLocations;
    public getDirectionButtonClicked = false;
    public directionOptions: any;
    public selectedDirectionList;
    origin;
    destination;

    constructor(private dashBoardSerVice: DashboardService) {
    }

    ngOnInit() {

        this.dashBoardSerVice.getDeviceLocation().subscribe(locationResponse => {
            //used for initializtion of device locations, and will not be altered
            this.deviceLocations = locationResponse;
            //this will be altered , the property will be added and changed for choosing the image type(selected or non selected type)
            this.deviceLocationList = locationResponse;
            for (let device of this.deviceLocationList) {
                device.is_selected = false;
            }
            //this is to disable the marker option produced due to agm-direction , because we use our custom marker through .png image
            // included in assets/images
            this.directionOptions = {
                suppressMarkers: true,
                preserveViewport: false
            };

            console.log('this is the list of the devices location', this.deviceLocationList);


        })

    }

    addPointToPlanRoute(location) {
        this.getDirectionButtonClicked = false;
        console.log(location);
        const index = this.planRouteLatLngList.findIndex(x => x.lat == location.latitude && x.lng == location.longitude);
        //we will use below deviceIndex to get devicelocation object and change selected and non selected icon
        const deviceIndex = this.deviceLocationList.findIndex(x => x.latitude == location.latitude && x.longitude == location.longitude);
        console.log(this.deviceLocations, 'gap ', this.deviceLocationList, deviceIndex, 'this is device index');

        console.log('this is index to check if the location already exits in array', index);
        if (index === -1) {

            this.planRouteLatLngList.push({lat: location.latitude, lng: location.longitude});
            //this makes this device object selected to change icon to selected one
            console.log(this.deviceLocationList[deviceIndex], 'this is the device object in if');
            this.deviceLocationList[deviceIndex].is_selected = true;

            if (this.planRouteLatLngList.length > 1) {
                this.routeCounter.push(this.planRouteLatLngList.length - 2);
            }

        } else {

            this.planRouteLatLngList.splice(index, 1);
            this.routeCounter.pop();
            //this make device object unselected to change icon to change icon to unselected one
            console.log(this.deviceLocationList[deviceIndex], 'this is the device object in else ');

            this.deviceLocationList[deviceIndex].is_selected = false;


        }

        console.log(this.routeCounter, 'this is couter coutn');

        if (this.planRouteLatLngList.length > 1) {
            for (let index of this.routeCounter) {
                console.log('inside route loop origin', index, this.planRouteLatLngList[index]);
                console.log('inside route loop destination', index + 1, this.planRouteLatLngList[index + 1])
            }
        }


        console.log(this.planRouteLatLngList, 'this is planned list');
        console.log(this.selectedDirectionList, 'this is selected list')


    }

    getDirection() {
        this.getDirectionButtonClicked = true;

        this.selectedDirectionList = [];
        this.origin = this.planRouteLatLngList[0];
        this.destination = this.planRouteLatLngList[this.planRouteLatLngList.length - 1];

        //remove first and last (origin and destination and get waypoints in between for route)
        const wayPoints = this.planRouteLatLngList.slice(1, this.planRouteLatLngList.length - 1);

        for (let loc of wayPoints) {
            this.selectedDirectionList.push({
                location: {lat: loc.lat, lng: loc.lng},
                stopover: true,
            });

            console.log(this.selectedDirectionList, 'this is selected list in get direction', 'refresh');

            // this.deviceLocations = this.planRouteLatLngList;


        }
    }
}
