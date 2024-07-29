import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { Message, MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductRequest } from '../../interfaces/product-request.interface';
import { ProductResponse } from '../../interfaces/product-response.interface';

@Component({
  selector: 'products-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  @Output() onProductCreated = new EventEmitter<ProductResponse>();

  messages: Message[] = [
    {
      severity: 'error',
      summary: 'Error',
      detail: 'Product name is required',
      closable: true,
    },
    {
      severity: 'error',
      summary: 'Error',
      detail: 'Product name must be at least 3 characters',
      closable: true,
    },
    {
      severity: 'error',
      summary: 'Error',
      detail: 'Product image is required',
      closable: true,
    },
    {
      severity: 'success',
      summary: 'Success',
      detail: 'Product created successfully',
      closable: true,
    },
    {
      severity: 'error',
      summary: 'Error',
      detail: 'An error occurred while creating the product',
      closable: true,
    },
  ];

  products: Product[] = [];
  productToCreate: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    imageUrl: new FormControl<File | null>(null, [Validators.required]),
  });

  visibleCreateModal: boolean = false;

  get name() {
    return this.productToCreate.get('name');
  }

  get image() {
    return this.productToCreate.get('imageUrl');
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.get().subscribe((products) => {
      this.products = products;
    });
  }
  onToggleCreateModal(): void {
    this.visibleCreateModal = !this.visibleCreateModal;
  }

  onCreateProduct(success: boolean, detail: string): void {
    this.onProductCreated.emit({ success, message: detail });

  }

  createProduct(): void {
    const formValue = this.productToCreate.value;
    const newProduct: ProductRequest = {
      name: formValue.name,
      image: formValue.imageUrl,
    };

    this.productService.create(newProduct)?.subscribe((response) => {
      this.onCreateProduct(response.success, response.message);
      this.visibleCreateModal = false;
      this.productToCreate.reset();
      this.getProducts();
    });
  }

  onSelectImage(event: any): void {
    const file = event.files[0];
    if (file) this.productToCreate.patchValue({ imageUrl: file });
    console.log(file);
  }
}
