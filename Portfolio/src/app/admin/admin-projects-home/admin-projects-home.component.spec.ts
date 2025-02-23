import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectsHomeComponent } from './admin-projects-home.component';

describe('AdminProjectsHomeComponent', () => {
  let component: AdminProjectsHomeComponent;
  let fixture: ComponentFixture<AdminProjectsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProjectsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProjectsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
