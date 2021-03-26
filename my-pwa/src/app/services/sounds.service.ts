import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundsService {

  constructor() { }
}

export interface Sound {
  id: number;
  title: String;
  style: number;
  style_name: String;
  file: String;
  added_on: Date;
  album: number;
  artist: number;
  added_by: string;
}
