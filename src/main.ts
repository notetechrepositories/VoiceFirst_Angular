import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


  
  bootstrapApplication(AppComponent, {
    providers: [
      { provide: HttpClientModule }  // Include HttpClientModule globally here if needed
    ]
  }).catch(err => console.error(err));