export class DeviceModel {

  id: number;
  name: string;
  serial_number: string;
  ssid_name: string;
  password: string;
  // location_logo: instanceOfFileReader.result;

  constructor(device) {
    this.id = device.id || null;
    this.name = device.name || '';
    this.serial_number = device.serial_number;
    this.ssid_name = device.ssid_name || '';
    this.password = device.password || '';
    // this.location_logo = device.location_logo;
  }
}
