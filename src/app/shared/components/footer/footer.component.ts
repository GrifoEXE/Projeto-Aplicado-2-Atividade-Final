import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  toggleMap: boolean = false;
  toggleList: boolean = false;
  toggleFavorites: boolean = false;

  isFirstCall: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isFirstCall = true;
  }

  navigateToMap(): void {
    this.isFirstCall = false;
    this.toggleMap = true;
    this.toggleList = false;
    this.toggleFavorites = false;
    this.router.navigate(['/board']);
  }

  navigateToList(): void {
    this.isFirstCall = false;
    this.toggleMap = false;
    this.toggleList = true;
    this.toggleFavorites = false;
    this.router.navigate(['/board/horarios']);
  }

  navigateToFavorites(): void {
    this.isFirstCall = false;
    this.toggleMap = false;
    this.toggleList = false;
    this.toggleFavorites = true;
    this.router.navigate(['/board/favoritos']);
  }
}
