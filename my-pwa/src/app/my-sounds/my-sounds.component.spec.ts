import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySoundsComponent } from './my-sounds.component';

describe('MySoundsComponent', () => {
  let component: MySoundsComponent;
  let fixture: ComponentFixture<MySoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySoundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
