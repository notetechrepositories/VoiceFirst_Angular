import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { NavigationFooterComponent } from "./navigation-footer/navigation-footer.component";
import { RegistrationpageComponent } from './registrationpage/registrationpage.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet,
        HomeComponent, NavigationFooterComponent,RegistrationpageComponent]
})
export class AppComponent {
  title = 'VoiceFirst';
}
