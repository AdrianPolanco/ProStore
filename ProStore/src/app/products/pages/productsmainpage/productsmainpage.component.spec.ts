import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsMainPageComponent } from './productsmainpage.component';

describe('ProductsmainpageComponent', () => {
  let component: ProductsMainPageComponent;
  let fixture: ComponentFixture<ProductsMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsMainPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
