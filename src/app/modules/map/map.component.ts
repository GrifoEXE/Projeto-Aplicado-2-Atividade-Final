import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CoordinatesProperties } from './model/map.model';
import { MapService } from './service/map.service';
import { stops } from './service/stops';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  carPosition: CoordinatesProperties | null = null;
  polylineCoordinates: CoordinatesProperties[] = []
  waypoints: any[] = [];
  currentUserPosition: CoordinatesProperties | null = null;
  nextWaypoint: any | null = null;

  coordinates: CoordinatesProperties[] = [];
  durationInSeconds: number = 0;
  distanceInMeters: number = 0;

  constructor(
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    const startLocation: CoordinatesProperties = { latitude: -3.7445, longitude: -38.4905 };
    const destinationLocation: CoordinatesProperties = { latitude: -3.7445, longitude: -38.4905 };

    this.carPosition = startLocation;

    this.getRouteCoordinates(startLocation, destinationLocation);
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentUserPosition = {latitude: position.coords.latitude, longitude: position.coords.longitude};
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }


  getRouteCoordinates(startLocation: CoordinatesProperties, destinationLocation: CoordinatesProperties) {
    try {
      this.mapService.getStops(stops).subscribe(res => {

      this.coordinates = res.coordinates;
      this.polylineCoordinates = res.coordinates;
      this.waypoints = res.waypoints;

      this.simulateCarMovement(this.coordinates);

      }, e => {
        console.log("Error", e);
      });
    } catch (error) {
      console.error('Error getting route coordinates:', error);
    }
  }

  async simulateCarMovement(coordinates: CoordinatesProperties[]): Promise<void> {
    for (const element of coordinates) {
      if (this.carPosition?.latitude !== element.latitude || this.carPosition?.longitude !== element.longitude) {
        this.carPosition = element;
      }
      await this.delay(5000);
    }
  }

  delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  trackByCoordinate(index: number, coordinate: any): string {
    return `${coordinate.latitude}-${coordinate.longitude}`;
  }
}
