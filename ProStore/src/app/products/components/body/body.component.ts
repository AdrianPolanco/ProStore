import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'products-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent implements OnInit{
  constructor(private productService: ProductService) { }

  products: Product[] = [];
  ngOnInit(): void {
    this.productService.get().subscribe(products => {
      this.products = products;
      console.log(this.products);
    });
  }
}
