import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewPortfolioComponent } from './create-new-portfolio.component';

describe('CreateNewPortfolioComponent', () => {
  let component: CreateNewPortfolioComponent;
  let fixture: ComponentFixture<CreateNewPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewPortfolioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
