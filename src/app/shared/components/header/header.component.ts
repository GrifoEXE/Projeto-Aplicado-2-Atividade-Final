import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public hour = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadTime();
    setInterval(() => { this.loadTime() }, 1000);
  }

  public navigateToHome(): void {
    this.router.navigate(['/']);
  }

  private loadTime(): void {
    this.hour = new Date().toLocaleTimeString('pt-BR').slice(0, 5);
  }
}
