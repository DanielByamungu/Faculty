import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css'],
})
export class FormInputComponent implements OnInit {
  @Input() type: string = "";
  @Input() inputName: string = "";
  @Input() text: string = "";
  @Input() modelAttribute: string = "";

  constructor() {}

  ngOnInit(): void {}
}
