import { NgModule } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  exports: [PanelModule, ButtonModule, TableModule, DialogModule]
})
export class PrimeModule { }
