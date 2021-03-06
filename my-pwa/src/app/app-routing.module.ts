import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { DetailsComponent } from './sound-details/details.component';
import { UploadSoundComponent } from './upload-sound/upload-sound.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'upload', component: UploadSoundComponent },
  { path: 'artist/:id',  component: ArtistDetailsComponent },
  { path: 'album/:id',  component: AlbumDetailsComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, anchorScrolling: 'enabled', initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
