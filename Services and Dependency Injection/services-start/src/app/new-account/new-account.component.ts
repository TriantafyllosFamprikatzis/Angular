import { Component } from '@angular/core';
import { AccountsService } from '../account.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService] 
  //AccountService must not be provided otherwise we call a new instance and overwrite the old one
})
export class NewAccountComponent {
  // @Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  //The type is not optional we need to set the class of service we want
  constructor(private loggingServ: LoggingService, private accountsService: AccountsService ) {
    this.accountsService.statusUpdated.subscribe((status: string) => alert('New Status: ' + status));
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);
    // this.accountAdded.emit({
    //   name: accountName,
    //   status: accountStatus
    // });


    // console.log('A server status changed, new status: ' + accountStatus);
    // this.loggingServ.logStatusChange(accountStatus);
  }
}
