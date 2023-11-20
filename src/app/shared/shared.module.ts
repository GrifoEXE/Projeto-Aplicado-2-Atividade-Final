import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ModalComponent } from './components/modal/modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScheduledTimeComponent } from './components/scheduled-time/scheduled-time.component';



@NgModule({
  declarations: [
    HeaderComponent,
    ModalComponent,
    FooterComponent,
    ScheduledTimeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
