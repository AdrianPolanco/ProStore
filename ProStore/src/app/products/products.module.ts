import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from '../prime/prime.module';
import { ProductsMainPageComponent } from './pages/productsmainpage/productsmainpage.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { TableComponent } from './components/table/table.component';



@NgModule({
  declarations: [
    ProductsMainPageComponent,
    HeaderComponent,
    BodyComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    PrimeModule
  ],
  exports: [ProductsMainPageComponent]
})
export class ProductsModule { }
