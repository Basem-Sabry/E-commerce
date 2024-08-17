import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastrComponent } from './shared/components/toastr/toastr.component';
import { SharedService } from './core/services/shared.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('messageContainer', { read: ViewContainerRef })
  messageContainer!: ViewContainerRef;
  componentRef: any = [];
  constructor(private viewContainerRef: ViewContainerRef,
    private _shared:SharedService


  ) {

    this._shared.toasterSubject.subscribe({
      next: (res => {
        console.log(res)
        if (res) {
          this.showCustomMessage(res)
        }
      })
    })
}

showCustomMessage(message:any) {

  const factory = this.messageContainer.createComponent(
      ToastrComponent
  );
  this.componentRef.push(factory);
  this.componentRef[this.componentRef.length - 1].instance.title =
      message?.title;
  this.componentRef[this.componentRef.length - 1].instance.content =
      message?.message;
      this.componentRef[this.componentRef.length - 1].instance.state =
     'in';
  this.componentRef[this.componentRef.length - 1].instance.icon =
      message?.type;
  this.componentRef[this.componentRef.length - 1].instance.index =
      this.componentRef.length - 1;

  this.componentRef[
      this.componentRef.length - 1
  ].instance.notificationState.subscribe((res:any) => {
    if (res.state == 'Close') {
      console.log('rrr', res)
      console.log('componentRef',this.componentRef)

          if (this.componentRef.length > 0) {
              this.componentRef[res.id].instance.state = 'out'
              // this.componentRef[res.id].destroy();
              this.componentRef.splice(res.id, 1);
          }
      }
  });
  setTimeout(() => {
      if (this.componentRef.length > 0) {
          // this.componentRef[0].destroy();
          this.componentRef[0].instance.state = 'out'

          this.componentRef.splice(0, 1);
      }
  }, 2000);
}
}
