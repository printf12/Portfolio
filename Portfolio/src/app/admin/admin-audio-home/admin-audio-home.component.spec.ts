import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAudioHomeComponent } from './admin-audio-home.component';

describe('AdminAudioHomeComponent', () => {
  let component: AdminAudioHomeComponent;
  let fixture: ComponentFixture<AdminAudioHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAudioHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAudioHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
