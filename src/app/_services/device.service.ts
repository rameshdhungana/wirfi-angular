import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DeviceService {
    constructor(private http: HttpClient) {
    }
    togglePriority(id, data) {
        return this.http.put(`device/${id}/priority`, data);
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

}
