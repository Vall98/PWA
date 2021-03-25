import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artist, ArtistsService } from '../services/artists.service';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.css']
})
export class ArtistDetailsComponent implements OnInit {

  artist: Artist = new Artist;

  constructor(private route: ActivatedRoute, private artistsService: ArtistsService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.artistsService.getArtist(id).subscribe((data) => {
      this.artist = data;
    });
  }

  ngOnInit(): void {
  }

}
