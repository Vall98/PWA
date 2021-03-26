import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table'
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { CameraComponent } from './camera/camera.component';
import { SoundsComponent } from './sounds/sounds.component';
import { DetailsComponent } from './sound-details/details.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { ArtistsSearchComponent } from './artists-search/artists-search.component';
import { SoundcardComponent } from './soundcard/soundcard.component';
import { UploadSoundComponent } from './upload-sound/upload-sound.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    ProfileComponent,
    CameraComponent,
    SoundsComponent,
    DetailsComponent,
    ArtistDetailsComponent,
    ArtistsSearchComponent,
    SoundcardComponent,
    UploadSoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatStepperModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatAutocompleteModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
