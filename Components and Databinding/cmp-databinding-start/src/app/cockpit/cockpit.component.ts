import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{blueprintName: string, blueprintContent: string}>();
  // newServerName = '';
  // newServerContent = '';
  @ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }


  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      blueprintName: nameInput.value,
      blueprintContent: this.serverContentInput.nativeElement.value
    });
  }



  
  // onAddServer(nameInput: HTMLInputElement) {
  //   this.serverCreated.emit({serverName: nameInput.value, serverContent: this.newServerContent});
  // }

  // onAddBlueprint(nameInput: HTMLInputElement) {
  //   this.blueprintCreated.emit({blueprintName: nameInput.value, blueprintContent: this.newServerContent});
  // }


  // onAddServer() {
  //   this.serverCreated.emit({serverName: this.newServerName, serverContent: this.newServerContent});
  // }


  // onAddBlueprint() {
  //   this.blueprintCreated.emit({blueprintName: this.newServerName, blueprintContent: this.newServerContent});
  // }
}
