import {ApplicationRef, DoBootstrap, Injector, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BadgeComponent} from './badge.component';
import {createCustomElement} from '@angular/elements';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
  declarations: [
    BadgeComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
  ],
})
export class AppModule implements DoBootstrap {

  constructor(
    private injector: Injector,
  ) {
  }

  public ngDoBootstrap(appRef: ApplicationRef): void {
    const element = createCustomElement(BadgeComponent, {injector: this.injector});

    customElements.define('angular-badge', element);

  }

}
