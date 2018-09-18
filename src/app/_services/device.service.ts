import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {BehaviorSubject} from "rxjs/Rx";

@Injectable()
export class DeviceService {
    public presetList = new BehaviorSubject<Array<any>>([]);

    constructor(private http: HttpClient) {
    }

    togglePriority(id, data) {
        return this.http.post(`device/${id}/priority/`, data);
    }

    getDeviceList() {
        return this.http.get('device/');
    }

    getDevice(id) {
        return this.http.get(`device/${id}/`);
    }

    postDeviceSno(device) {
        return this.http.post('device/', device);
    }

    postDeviceinfo(data) {
        return this.http.post('device/', data);
    }

    postDeviceImages(data, id) {
        return this.http.post(`device/${id}/images/`, data);
    }

    updateDeviceDetail(device, id) {
        return this.http.put(`device/${id}/`, device.getRawValue);
    }

    postDeviceDetail(data, id) {
        return this.http.post(`device/${id}/`, data);
    }

    setupDeviceNetwork(network, id) {
        return this.http.put(`device/${id}/network/`, network);
    }

    deleteDevice(id) {
        return this.http.delete(`device/${id}/`);
    }

    muteDevice(id, data) {
        return this.http.post(`device/${id}/mute/`, data);
    }

    getPresetFilterList() {

        this.http.get('preset-filter/').subscribe(response => {
            this.presetList.next(<Array<any>> response);
        });
        return this.presetList
    }

    getPresetFilter(id) {
        this.http.get(`preset-filter/${id}/`);
    }

    addPresetFilter(data) {
        console.log(data, 'tjhis is preset data passed');
        return this.http.post(`preset-filter/`, data)
    }

}
