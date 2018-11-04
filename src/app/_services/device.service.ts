import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {BehaviorSubject} from 'rxjs/Rx';

@Injectable()
export class DeviceService {
    public presetList = new Subject<Array<any>>();
    public deviceList = new Subject<Array<any>>();

    constructor(private http: HttpClient) {
    }

    togglePriority(id, data) {
        return this.http.post(`device/${id}/priority/`, data);
    }

    getDeviceList() {
        this.http.get('device/').subscribe(response => {
            this.deviceList.next(<Array<any>>response);
        });
        return this.deviceList;
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
        return this.presetList;
    }

    getPresetFilter(id) {
        return this.http.get(`preset-filter/${id}/`);
    }

    addPresetFilter(data) {
        return this.http.post(`preset-filter/`, data);
    }

    deletePresetFilter(id) {
        return this.http.delete(`preset-filter/${id}/`);

    }

    addNetworkSetting(id, data) {
        return this.http.post(`device/${id}/network/`, data);
    }

    updateNetworkSetting(device_id, network_id, data) {
        return this.http.put(`device/${device_id}/network/${network_id}/`, data);
    }

    deleteNetworkSetting(device_id, network_id) {
        return this.http.delete(`device/${device_id}/network/${network_id}/`);
    }

    sleepDevice(id, data) {
        return this.http.post(`device/${id}/sleep/`, data);
    }

}
