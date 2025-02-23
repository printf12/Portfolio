import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private sharedService:SharedService, private toastr: ToastrService) { }

  contactForm: FormGroup;
 
  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required],
      subject: ['', Validators.required]
    });
  }

  onSubmit() {
    this.sharedService.sendMail(this.contactForm.value).subscribe((res:any) => {
      this.toastr.success('Email sent to Admin successfully');
      this.contactForm.reset();
    });
  }

}
