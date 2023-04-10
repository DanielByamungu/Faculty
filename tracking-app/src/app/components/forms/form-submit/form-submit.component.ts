import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'form-submit',
  templateUrl: './form-submit.component.html',
  styleUrls: ['./form-submit.component.css'],
})
export class FormSubmitComponent implements OnInit {
  @Input() inputval: string = '';

  constructor() {}

  ngOnInit(): void {}
}
