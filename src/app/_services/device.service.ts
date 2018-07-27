import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DeviceService {
    constructor(private http: HttpClient) {
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

    updateDeviceDetail(device, id) {
      return this.http.put(`device/${id}/`, device.getRawValue);
    }

    setupDeviceNetwork(network, id) {
      return this.http.put(`device/${id}/network/`, network);
    }

    deleteDevice(id) {
      return this.http.delete(`device/${id}/`);
    }

    ngOnInit() {
    }

}
