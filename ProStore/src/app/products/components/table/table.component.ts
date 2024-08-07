import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { baseAzureContainerUrl } from '../../../env/azure-container.env';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { messages } from '../../utils/messages';
import { Message } from 'primeng/api';
import { ProductService } from '../../services/product.service';
import { ProductResponse } from '../../interfaces/product-response.interface';

@Component({
  selector: 'products-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {

  constructor(private productService: ProductService) { }

  @Output() onUpdatedProduct: EventEmitter<string> = new EventEmitter<string>();

  baseAzureUrl: string = baseAzureContainerUrl;

  @Input({ required: true }) products!: Product[];

  messages: Message[] = messages;

  visibleUpdateModal: boolean = false;
  visibleDeleteModal: boolean = false;

  @Output() onProductDeleted = new EventEmitter<ProductResponse>();

  currentProduct: Product | null = null;

  updateProductForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    imageUrl: new FormControl<File | null>(null, [Validators.required]),
    image: new FormControl<File | null>(null),
  });

  onOpenUpdateModal(product: Product): void {
    this.visibleUpdateModal = !this.visibleUpdateModal;
    this.populateProductForm(product);
  }

  onOpenDeleteModal(product: Product): void {
    this.visibleDeleteModal = !this.visibleDeleteModal;
    this.currentProduct = product;
  }

  private populateProductForm(product: Product): void {
    this.currentProduct = product;
    this.updateProductForm.patchValue({
      id: product.id,
      name: product.name,
      imageUrl: `${this.baseAzureUrl}/${product.imageUrl}`,
    });
  }

  onCloseUpdateModal(): void {
    this.visibleUpdateModal = false;
    this.currentProduct = null;
    this.updateProductForm.reset();
  }

  onCloseDeleteModal(): void {
    this.visibleDeleteModal = false;
    this.currentProduct = null;
  }

  updateProduct() {
    const formValue = this.updateProductForm.value;

    if(!formValue) return;

    this.currentProduct = {
      id: formValue.id,
      name: formValue.name,
      imageUrl: formValue.image,
    };

    if (this.currentProduct) {
      this.productService.update(this.currentProduct)?.subscribe((product) => {
        if(!product) return;
        this.onCloseUpdateModal();
        this.onUpdatedProduct.emit("Updated product successfully");
      })
    }
  }

  onSelectImage(event: any): void {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.updateProductForm.patchValue({ imageUrl: e.target.result });
      };
      this.updateProductForm.patchValue({ image: file });
      reader.readAsDataURL(file);
    }
  }

  deleteProduct() {
    if(this.currentProduct)
      this.productService.delete(this.currentProduct.id).subscribe((productResponse) => {
        this.onProductDeleted.emit(productResponse);
        this.onCloseDeleteModal();
      });
  }
}
