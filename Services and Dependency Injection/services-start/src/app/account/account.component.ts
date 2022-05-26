import { Component, Input } from '@angular/core';
import { AccountsService } from '../account.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService] 
  //AccountService must not be provided otherwise we call a new instance and overwrite the old one
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  // @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();

  //The type is not optional we need to set the class of service we want
  constructor(private loggingServ: LoggingService, private accountService: AccountsService) {}

  onSetTo(status: string) {
    this.accountService.updateStatus(this.id, status);

    this.accountService.statusUpdated.emit(status);

    // this.statusChanged.emit({id: this.id, newStatus: status});


    // console.log('A server status changed, new status: ' + status);
    // this.loggingServ.logStatusChange(status);
  }
}
