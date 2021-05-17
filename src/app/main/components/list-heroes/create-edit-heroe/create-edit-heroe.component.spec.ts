import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditHeroeComponent } from './create-edit-heroe.component';

describe('CreateEditHeroeComponent', () => {
  let component: CreateEditHeroeComponent;
  let fixture: ComponentFixture<CreateEditHeroeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditHeroeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditHeroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
