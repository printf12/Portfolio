import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
   loading = false;
    submitted = false;
  constructor( private formBuilder: FormBuilder, private sharedService: SharedService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit(){
    this.submitted = true;
    this.sharedService.login(this.loginForm.value).subscribe((res:any) => {
      if(res.status == "connected") {
        this.toastr.success('Connected successfully', 'Admin connected');
        this.router.navigate(['/admin']);
      }
      else {
        this.toastr.error('Connected Failed', res.message);
        this.router.navigate(['/admin/login']);

      }
    })
  }

  get f() { return this.loginForm.controls; }

}
