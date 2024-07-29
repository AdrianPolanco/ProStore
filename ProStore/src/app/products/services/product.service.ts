import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { ProductResponse } from '../interfaces/product-response.interface';
import { baseApiUrl } from '../../env/api.env';
import { ProductRequest } from '../interfaces/product-request.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = [];

  constructor(private httpClient: HttpClient) {}
  get(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(baseApiUrl);
  }

  create(product: ProductRequest): Observable<ProductResponse> | null {
    if (!product.name || !product.image) return null;

    const formData = new FormData();
    formData.append('Name', product.name);
    formData.append('Image', product.image);
    return this.httpClient.post<ProductResponse>(baseApiUrl, formData);
  }

  update(product: Product): Observable<ProductResponse> | null {
    if (!product.id || !product.name || !product.imageUrl) return null;

    return this.httpClient.put<ProductResponse>(
      `${baseApiUrl}/${product.id}`,
      product
    );
  }

  delete(id: number): Observable<ProductResponse> {
    return this.httpClient.delete<ProductResponse>(`${baseApiUrl}/${id}`);
  }
}
