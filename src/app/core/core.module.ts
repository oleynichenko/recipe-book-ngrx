import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {CollapseModule} from 'ngx-bootstrap';

import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import {ShoppingListModule} from '../shopping-list/shopping-list.module';
import {AuthModule} from '../auth/auth.module';
import {AuthInterceptor} from '../shared/auth.interceptor';
import {LoggingInterceptor} from '../shared/logging.interсeptor';

@NgModule({
  declarations: [HeaderComponent, HomeComponent],
  imports: [
    SharedModule,
    AppRoutingModule,
    CommonModule,
    AuthModule,
    ShoppingListModule,
    CollapseModule.forRoot(),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
  ],
  exports: [AppRoutingModule, HeaderComponent]
})

export class CoreModule { }
