import {Component, Injectable, Input, OnInit} from '@angular/core';

@Component({
  selector: 'error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class ErrorMessageComponent implements OnInit {
  @Input() error: string = "";

  constructor() { }

  ngOnInit(): void {
  }
}
