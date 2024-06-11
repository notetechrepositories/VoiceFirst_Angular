import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';




@Component({
    selector: 'app-navigation-footer',
    standalone: true,
    templateUrl: './navigation-footer.component.html',
    styleUrl: './navigation-footer.component.css',
    imports: [RouterOutlet,RouterLink,RouterLinkActive]
})
export class NavigationFooterComponent {

   constructor(private router:Router){}

   goToLogin(){
    this.router.navigate(['/login-register']);
   }


}
