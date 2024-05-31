import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {

}
