import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';
import { ProductsMainPageComponent } from './pages/productsmainpage/productsmainpage.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { TableComponent } from './components/table/table.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductsMainPageComponent,
    HeaderComponent,
    BodyComponent,
    TableComponent,
  ],
  imports: [CommonModule, UiModule, ReactiveFormsModule],
  exports: [ProductsMainPageComponent],
})
export class ProductsModule {}
