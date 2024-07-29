import { Component } from '@angular/core';
import { ProductResponse } from '../../interfaces/product-response.interface';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'products-main-page',
  templateUrl: './productsmainpage.component.html',
  styleUrl: './productsmainpage.component.css'
})
export class ProductsMainPageComponent {
  message?: Message;
  constructor(private messageService: MessageService) { }

  showCreateProductResponse(event: ProductResponse) {
    this.message = {
      severity: event.success ? 'success' : 'error',
      summary: event.success ? 'Success' : 'Error',
      detail: event.message,
    };
    this.messageService.add(this.message);
  }
}
