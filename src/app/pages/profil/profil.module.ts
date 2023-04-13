import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilComponent } from './profil.component';
import {MatCardModule} from '@angular/material/card'
import {MatIconModule} from '@angular/material/icon'

@NgModule({
  declarations: [
    ProfilComponent
  ],
  imports: [
    CommonModule,
    ProfilRoutingModule,
    MatCardModule, 
    MatIconModule
  ]
})
export class ProfilModule { }
