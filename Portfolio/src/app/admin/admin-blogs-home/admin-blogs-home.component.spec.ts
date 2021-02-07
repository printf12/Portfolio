import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBlogsHomeComponent } from './admin-blogs-home.component';

describe('AdminBlogsHomeComponent', () => {
  let component: AdminBlogsHomeComponent;
  let fixture: ComponentFixture<AdminBlogsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBlogsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBlogsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
