import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { baseAzureContainerUrl } from '../../../env/azure-container.env';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { messages } from '../../utils/messages';
import { Message } from 'primeng/api';
import { ProductService } from '../../services/product.service';

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

  private populateProductForm(product: Product): void {
    this.currentProduct = product;
    this.updateProductForm.patchValue({
      id: product.id,
      name: product.name,
      imageUrl: `${this.baseAzureUrl}/${product.imageUrl}`,
    });
    console.log('Product to update:', this.updateProductForm.value);
  }

  onCloseUpdateModal(): void {
    this.visibleUpdateModal = false;
    this.currentProduct = null;
    this.updateProductForm.reset();
  }

  updateProduct() {
    const formValue = this.updateProductForm.value;

    if(!formValue) return;

    this.currentProduct = {
      id: formValue.id,
      name: formValue.name,
      imageUrl: formValue.image,
    };

    console.log('Product to update:', this.currentProduct);

    if (this.currentProduct) {
      this.productService.update(this.currentProduct)?.subscribe((product) => {
        if(!product) return;
        this.onCloseUpdateModal();
        console.log('Product updated:', product);
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
}
