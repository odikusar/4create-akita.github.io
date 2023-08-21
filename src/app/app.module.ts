import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AkitaNgDevtools.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
