import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { CoordinatesProperties } from '../model/map.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private baseUrl = 'http://localhost:3001/api/directions'; // Aponte para o seu servidor Node.js

  constructor(
    private http: HttpClient,
  ) { }

  getStops(stops: string[]): Observable<any> {
    const origin = stops[0];
    const destination = stops[stops.length - 1];

    return this.http.post<any>(this.baseUrl, { origin, destination, waypoints: stops }).pipe(
      map((response: any) => {
        if (response.status === 'OK' && response.routes && response.routes.length > 0) {

          const route = response.routes[0];
          const waypointsCoordinates = response.waypoints;

          if (route.overview_polyline && route.overview_polyline.points) {

            const stepPolylines = route.legs.reduce((polylines: any[], leg: { steps: any[]; }) => {
              leg.steps.forEach((step: { polyline: { points: any; }; }) => {
                polylines.push(step.polyline.points);
              });
              return polylines;
            }, []);

            const coordinates = stepPolylines.map((polyline: string) => this.decodePolyline(polyline)).flat();
            const durationInSeconds = route.legs.reduce((total: number, leg: any) => total + leg.duration.value, 0);
            const distanceInMeters = route.legs.reduce((total: number, leg: any) => total + leg.distance.value, 0);

            waypointsCoordinates.shift();
            waypointsCoordinates.pop();

            const { start_address, end_address, distance, duration, start_location, end_location } = route.legs[0];

            const mergedWaypoints = waypointsCoordinates.map((coordinate: { latitude: number, longitude: number }, index: number) => {
              return {
                ...coordinate,
                name: stops[index]
              };
            });

            const waypoints = [
              {
                name: start_address,
                distance: distance.text,
                duration: duration.text,
                latitude: start_location.lat,
                longitude: start_location.lng
              },
              ...mergedWaypoints,
              {
                name: end_address,
                distance: distance.text,
                duration: duration.text,
                latitude: end_location.lat,
                longitude: end_location.lng
              }
            ];

            return { coordinates, durationInSeconds, distanceInMeters, waypoints };
          } else {
            throw new Error('Nenhuma rota encontrada.');
          }
        } else {
          throw new Error('Erro na resposta da solicitação de direções.');
        }
      }),
      catchError((error) => {
        console.log(error);
        return throwError(`Erro ao obter coordenadas da rota: ${error.message}`);
      })
    );
  }

  private decodePolyline(encoded: string): CoordinatesProperties[] {
    let poly: CoordinatesProperties[] = [];
    let index = 0;
    let len = encoded.length;
    let lat = 0;
    let lng = 0;

    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;

      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      let dlat = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;

      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      let dlng = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      poly.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }

    return poly;
  };
}
