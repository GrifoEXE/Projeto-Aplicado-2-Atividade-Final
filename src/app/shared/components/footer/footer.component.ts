import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  toggleMap: boolean = false;
  toggleList: boolean = false;
  toggleFavorites: boolean = false;

  constructor(private router: Router) { }

  public navigateToMap(): void {
    this.toggleMap = true;
    this.toggleList = false;
    this.toggleFavorites = false;
    this.router.navigate(['/board']);
  }

  public navigateToList(): void {
    this.toggleMap = false;
    this.toggleList = true;
    this.toggleFavorites = false;
    this.router.navigate(['/board/horarios']);
  }

  public navigateToFavorites(): void {
    this.toggleMap = false;
    this.toggleList = false;
    this.toggleFavorites = true;
    this.router.navigate(['/board/favoritos']);
  }
}
