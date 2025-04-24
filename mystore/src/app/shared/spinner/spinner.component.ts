import { Component } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-spinner',
  imports: [NgIf],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  constructor(public spinner: SpinnerService) { }

  ngOnInit() {
    // You can add any initialization logic here if needed
  }

}
