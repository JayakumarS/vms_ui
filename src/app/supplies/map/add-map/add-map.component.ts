import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as tt from '@tomtom-international/web-sdk-maps';
import { environment } from '../environments';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MapService } from '../map.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UserLogPopupComponent } from '../../utilities/user-log-popup/user-log-popup.component';
import { FilterComponent } from 'ag-grid-community/dist/lib/components/framework/componentTypes';
import { FilterPopupComponent } from '../filter-popup/filter-popup.component';


@Component({
  selector: 'app-add-map',
  templateUrl: './add-map.component.html',
  styleUrls: ['./add-map.component.sass']
})
export class AddMapComponent implements AfterViewInit {

  map: any;

  constructor(private fb: FormBuilder,
    public mapService: MapService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router) { }

  public ngAfterViewInit(): void {
    this.loadMap();
  }

  private getCurrentPosition(): any {
    return new Observable((observer: Subscriber<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          observer.complete();
        });
      } else {
        observer.error();
      }
    });
  }

  private loadMap(): void {
    this.map = tt.map({
      key: environment.tomtom.key,
      container: 'map',
    });

    this.map.addControl(new tt.FullscreenControl());
    // this.map.addControl(new tt.NavigationControl());

    this.hideAttribution();

    // this.getCurrentPosition()
    // .subscribe((position: any) => {
    //   this.map.flyTo({
    //     center: {
    //       lat: position.latitude,
    //       lng: position.longitude,
    //     },
    //     zoom: 13,
    //   });

    //   const popup = new tt.Popup({ anchor: 'bottom', offset: { bottom: [0, -40] } }).setHTML('Angular TomTom');
  
    //   var marker = new tt.Marker().setLngLat({
    //     lat: 37.7749,
    //     lng: -122.4194,
    //   }).addTo(this.map);
    //   marker.setPopup(popup).togglePopup();
    // });
  }

  private hideAttribution(): void {
    // Use MutationObserver to hide the attribution element
    const targetNode = document.getElementById('map');
    const observer = new MutationObserver((mutationsList, observer) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const attributionElement = document.querySelector('.tt-attribution-container') as HTMLElement;
          if (attributionElement) {
            attributionElement.style.display = 'none';
            observer.disconnect(); // Stop observing once the element is hidden
            break;
          }
        }
      }
    });

    const config = { childList: true, subtree: true };
    if (targetNode) {
      observer.observe(targetNode, config);
    }
  }

  // ngOnInit(): void {
  // }

  filter(){
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const obj = {
      // jspId
  }
    const dialogRef = this.dialog.open(FilterPopupComponent, {
      height: "300px",
      width: "30%",
      data: {
        action: obj,
      },
      direction: tempDirection,
    });
  }

}


