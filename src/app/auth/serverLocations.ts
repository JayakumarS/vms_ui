import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class serverLocations {
  apiServerAddress: any;
  secretKey: any;
  constructor( ) {
    this.secretKey = 7061737323313233;

    if (window.location.hostname === 'localhost') {
      //Local
        this.apiServerAddress = 'http://localhost:8080/'
       
    } else if (window.location.hostname === '213.42.28.17') {
      //For Server Added 
      this.apiServerAddress = 'http://65.108.201.61:8090/pvms/';
      
    } 
    
  }
}
export const VARIABLE_SERVICE_PROVIDER = [
  serverLocations
];
