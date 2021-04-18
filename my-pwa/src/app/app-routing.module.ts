import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { HomeComponent } from './home/home.component';
import { MySoundsComponent } from './my-sounds/my-sounds.component';
import { ProfileComponent } from './profile/profile.component';
import { DetailsComponent } from './sound-details/details.component';
import { UploadSoundComponent } from './upload-sound/upload-sound.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'upload', component: UploadSoundComponent },
  { path: 'artist/:id',  component: ArtistDetailsComponent },
  { path: 'my-sounds',  component: MySoundsComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
