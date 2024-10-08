import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { Message, MessageService } from 'primeng/api';
import { FileUpload, UploadEvent } from 'primeng/fileupload';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductRequest } from '../../interfaces/product-request.interface';
import { ProductResponse } from '../../interfaces/product-response.interface';
import { messages } from '../../utils/messages';

@Component({
  selector: 'products-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent implements OnInit {
  constructor(
    private productService: ProductService
  ) {}

  @Output() onProductCreated = new EventEmitter<ProductResponse>();
  @ViewChild('fileUpload') fileUpload!: FileUpload;

  messages: Message[] = messages

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
  onToggleCreateModal(): void{
    this.visibleCreateModal = !this.visibleCreateModal;
    this.resetForm();
  }

  resetForm(): void {
    if (!this.visibleCreateModal) {
      this.productToCreate.reset();
      this.fileUpload.clear();
    }
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
      this.fileUpload.clear();
      this.getProducts();
    });
  }

  onSelectImage(event: any): void {
    const file = event.files[0];
    if (file) this.productToCreate.patchValue({ imageUrl: file });
  }
}
