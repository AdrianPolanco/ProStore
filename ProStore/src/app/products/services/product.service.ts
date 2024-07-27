import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { ProductResponse } from '../interfaces/product-response.interface';
import { baseApiUrl } from '../../env/api.env';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  get(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(baseApiUrl);
  }

  create(product: Product): Observable<ProductResponse> | null {
    if (!product.name || !product.imageUrl) return null;

    return this.httpClient.post<ProductResponse>(baseApiUrl, product);
  }

  update(product: Product): Observable<ProductResponse> | null {
    if (!product.id || !product.name || !product.imageUrl) return null;

    return this.httpClient.put<ProductResponse>(`${baseApiUrl}/${product.id}`, product);
  }

  delete(id: number): Observable<ProductResponse> {
    return this.httpClient.delete<ProductResponse>(`${baseApiUrl}/${id}`);
  }

}
