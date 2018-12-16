import {NgModule} from '@angular/core';

import {DropdownDirective} from './dropdown.directive';
import {HttpClientModule} from '@angular/common/http';
import {DataStorageService} from './data-storage.service';

@NgModule({
  declarations: [DropdownDirective],
  imports: [HttpClientModule],
  exports: [DropdownDirective],
  providers: [DataStorageService]
})

export class SharedModule { }
