import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { baseAzureContainerUrl } from '../../../env/azure-container.env';

@Component({
  selector: 'products-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

    baseAzureUrl: string = baseAzureContainerUrl;
    @Input({required: true}) products!: Product[];
}
