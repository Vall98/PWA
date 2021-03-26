import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artist, ArtistsService } from '../services/artists.service';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.css']
})
export class ArtistDetailsComponent implements OnInit {

  artist: Artist = new Artist();

  constructor(private route: ActivatedRoute, private artistsService: ArtistsService) {
  }
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = Number(params['id']);
      this.artist = this.artistsService.getArtistById(id) || this.artist;
    });
  }

}
