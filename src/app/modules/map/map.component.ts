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

  coordinates: CoordinatesProperties[] = [];
  durationInSeconds: number = 0;
  distanceInMeters: number = 0;

  constructor(
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    const startLocation: CoordinatesProperties = { latitude: -3.7445, longitude: -38.4905 };
    const destinationLocation: CoordinatesProperties = { latitude: -3.7445, longitude: -38.4905 };

    // Initialize car position
    this.carPosition = startLocation;

    // Get route coordinates between start and destination
    this.getRouteCoordinates(startLocation, destinationLocation);

  }


  getRouteCoordinates(startLocation: CoordinatesProperties, destinationLocation: CoordinatesProperties) {
    try {
      this.mapService.getStops(stops).subscribe(res => {

      this.coordinates = res.coordinates;
      this.polylineCoordinates = res.coordinates;
      this.durationInSeconds = res.durationInSeconds;
      this.distanceInMeters = res.distanceInMeters;

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
      this.carPosition = element;
      await this.delay(500);
    }
  }

  delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
