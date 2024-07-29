import { NgModule } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropzoneCdkModule } from '@ngx-dropzone/cdk';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';



@NgModule({
  exports: [
    PanelModule,
    ButtonModule,
    TableModule,
    DialogModule,
    DropzoneCdkModule,
    InputTextModule,
    FileUploadModule,
    ToastModule,
    MessagesModule,
    MessageModule
  ],
  providers: [MessageService],
})
export class UiModule {}
