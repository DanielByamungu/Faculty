import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private mediaQuery = window.matchMedia('(max-width: 600px)');
  public isMobileView: boolean = false;
  public drawerActive: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.isMobileView = this.mediaQuery.matches;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    this.isMobileView = this.mediaQuery.matches;
  }

  private toggleDrawer() {
    this.drawerActive = !this.drawerActive;
  }

  hamburgerIconClick(): void {
    this.toggleDrawer();

    let container: HTMLElement | null =
      document.getElementById('drawer-container');

    if (container) {
      container.classList.remove('animate-close');
      container.classList.add('animate-open');
    }
  }

  closeButtonClick(): void {
    this.toggleDrawer();

    let container: HTMLElement | null =
      document.getElementById('drawer-container');

    if (container) {
      container.classList.remove('animate-open');
      container.classList.add('animate-close');
    }
  }
}
