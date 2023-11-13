import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { applicationInitializer } from './interceptor/application.initializer';
import { TokenManagerService } from './services/token-manager.service';
import { RecruiterLayoutComponent } from './layout/recruiter-layout/recruiter-layout.component';
import { RecruiterMenuComponent } from './menu/recruiter-menu/recruiter-menu.component';
import { AdminMenuComponent } from './menu/admin-menu/admin-menu.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DatePipe } from '@angular/common';
import { PipesModule } from './pipes/pipes.module';
import { InterviewerLayoutComponent } from './layout/interviewer-layout/interviewer-layout.component';
import { InterviewerMenuComponent } from './menu/interviewer-menu/interviewer-menu.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    PublicLayoutComponent,
    AdminLayoutComponent,
    RecruiterLayoutComponent,
    RecruiterMenuComponent,
    AdminMenuComponent,
    InterviewerLayoutComponent,
    InterviewerMenuComponent
  ],
  imports: [
    PipesModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    DatePipe,
    { provide: APP_INITIALIZER, useFactory: applicationInitializer, multi: true, deps: [TokenManagerService] },
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
