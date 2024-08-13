import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserStorageService } from './services/storage/user-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ECommerceWeb';

  isCustomerLoggedIn: boolean = UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();
  isHomePage: boolean = false; // Track if the current route is the home page

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Determine if the current route is the home page
        this.isHomePage = (event.urlAfterRedirects === '/' || event.urlAfterRedirects.startsWith('/home'));

        // Update login status based on user storage service
        this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
        this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
      }
    });
  }

  logout() {
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }
}
