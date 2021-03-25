import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ArtistsService, Artist } from '../services/artists.service';

@Component({
  selector: 'app-artists-search',
  templateUrl: './artists-search.component.html',
  styleUrls: ['./artists-search.component.css']
})
export class ArtistsSearchComponent implements OnInit {

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public artistsService: ArtistsService, private router: Router) {
    this.searchForm = this.formBuilder.group({
      artistName: ['']
    });
  }

  filterArtists(): Artist[] {
    const value: String = this.searchForm.get('artistName')?.value;
    return this.artistsService.artists.filter(option => option.name.toLowerCase().indexOf(value.toLowerCase()) === 0);
  }

  ngOnInit(): void {
    this.artistsService.getAllArtists();
  }

  search(): void {
    //get id
    let artist: Artist | undefined = this.artistsService.artists.find(obj => {
      return obj.name === this.searchForm.get('artistName')?.value;
    })
    if (artist) this.router.navigateByUrl('/artist/' + artist.id);
  }

}
