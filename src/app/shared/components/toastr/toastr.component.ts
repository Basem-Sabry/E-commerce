import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrl: './toastr.component.scss',
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in')
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ]),

  ]
})
export class ToastrComponent {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() icon: string = '';
  @Input() index: string = '';
  @Input() state: string = '';



  @Output() notificationState = new EventEmitter();
  constructor() { }


  closeNotification() {
    this.state = 'out'
    this.notificationState.emit({ state: 'Close', id: this.index })
  }
}
