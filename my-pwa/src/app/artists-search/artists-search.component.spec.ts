import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsSearchComponent } from './artists-search.component';

describe('ArtistsSearchComponent', () => {
  let component: ArtistsSearchComponent;
  let fixture: ComponentFixture<ArtistsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistsSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
