import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/helpers/app-contants.helper';
import { TokenManagerService } from 'src/app/services/token-manager.service';
import { LoginService } from 'src/app/services/login.service';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';
import { TranslateService } from '@ngx-translate/core';
import { EmailValidator } from 'src/app/helpers/email.validator';
import { CustomLoaderService } from 'src/app/services/custom-loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  public signinForm: FormGroup;
 
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private toastr: CustomToastrService,
    private loginservice: LoginService,
    private tokenService: TokenManagerService,
    private translate: TranslateService,
    private loader: CustomLoaderService
   ) 
   {
    this.signinForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      
    });
  }

  
  get username() { return this.signinForm.get("username"); }
  get password() { return this.signinForm.get("password"); }
  

  ngOnInit(): void {
    
  }

  onLogin(){
    
    if (this.signinForm.invalid) {
      this.translate.get('HOME.FORM_NAME_VALID', { form_name: 'Login' }).subscribe((res: string) => {
        this.toastr.error(res);
      });
      this.signinForm.markAllAsTouched();
    }
    
    let paylod={
      userName:this.signinForm.value.username,
      password:this.signinForm.value.password,
      rememberMe: true
    }

    this.loader.show();
    this.loginservice.userlogin(paylod).subscribe((res:any)=>{
      this.loader.hide();
      if(res.responseCode==AppConstants.API_RESPONSE.SUCCESS.CODE){
        this.tokenService.cacheTokens(res.data,paylod.rememberMe);
        const landingPage = this.tokenService.getMyLandingPage();
        this.router.navigate([landingPage]);
      }
    },(error:any)=>{
      this.loader.hide();
    });

  }
  
}


