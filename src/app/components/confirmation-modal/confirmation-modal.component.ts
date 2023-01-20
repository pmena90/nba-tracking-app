import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  @Input() modalTitle = "Title";
  @Input() closeText = "Close";
  @Input() yesText = "Yes";
  @Input() btnSubmitClass = 'btn-primary';
  @Output() confirmationEvent = new EventEmitter<null>();

  constructor() { }

  confirm() {
    setTimeout(() => { //Allow animation to end
      this.confirmationEvent.emit();
    }, 300);
  }

}
