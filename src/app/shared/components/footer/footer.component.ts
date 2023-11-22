import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private router: Router) { }

  public navigateToMap(): void {
    this.router.navigate(['/board']);
  }

  public navigateToList(): void {
    this.router.navigate(['/board/horarios']);
  }

  public navigateToFavorites(): void {
    this.router.navigate(['/board/favoritos']);
  }
}
