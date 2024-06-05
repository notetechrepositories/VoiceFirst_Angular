import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationFooterComponent } from "./navigation-footer/navigation-footer.component";

import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet,NavigationFooterComponent]
})
export class AppComponent {
  title = 'VoiceFirst';
}
