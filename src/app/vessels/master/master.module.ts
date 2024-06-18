import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MasterRoutingModule } from './master-routing.module';
import { CountryMasterModule } from './country-master/country-master.module';
import { DesignationMasterModule } from './designation-master/designation-master.module';
import { ListDesingnationMasterComponent } from 'src/app/master/designation-master/list-desingnation-master/list-desingnation-master.component';

@NgModule({
  declarations: [
 
  
  
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    CountryMasterModule,
    DesignationMasterModule,
  ]
})
export class MasterModule { }
