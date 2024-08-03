import { Message } from "primeng/api";

  export const messages: Message[] = [
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
      severity: 'success',
      summary: 'Success',
      detail: 'Product updated successfully',
      closable: true,
    },
    {
      severity: 'error',
      summary: 'Error',
      detail: 'An error occurred while creating the product',
      closable: true,
    },
    {
      severity: 'error',
      summary: 'Error',
      detail: 'An error occurred while updating the product',
      closable: true,
    },
  ];
