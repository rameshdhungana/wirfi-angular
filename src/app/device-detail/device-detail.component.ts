import {Component, OnInit} from '@angular/core';
import {DeviceService} from '../_services/device.service';
import {Route, Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-device-detail',
    templateUrl: './device-detail.component.html',
    styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {
    device_id: any;
    public device_data: any;
    lat: number;
    lng: number;
    counter: any;
    test_video_source: any;
    videoToPlay: any = [];

    constructor(private deviceService: DeviceService,
                private router: Router,
                private route: ActivatedRoute) {
        this.device_id = this.route.snapshot.paramMap.get('id');
        this.counter = [0, 1, 2, 3, 4];
        this.test_video_source = [
            "https://www.w3schools.com/html/movie.mp4",
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "https://www.w3schools.com/html/movie.mp4",
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        ];
        this.videoToPlay = this.test_video_source[0];


        this.deviceService.getDevice(this.device_id).subscribe(response => {
            this.device_data = response;
            this.lat = response['data']['latitude'];
            this.lng = response['data']['longitude'];
        });
    }

    ngOnInit() {

        console.log(this.counter);

    }

    playThisVideo(src) {
        this.videoToPlay = this.test_video_source[src];
        console.log(this.videoToPlay)

    }

}
