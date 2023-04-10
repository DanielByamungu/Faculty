import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @Input() controlName: string = "";
  public file: File | null = null;
  onChange: Function = () => {};

  @HostListener('change', ['$event.target.files']) emitFiles (event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }

  constructor(private host: ElementRef<HTMLInputElement>) { }

  registerOnChange (fn: Function){
    this.onChange = fn;
  }

  ngOnInit(): void {
  }

}
