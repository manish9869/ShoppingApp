
import { AngularMaterialModule } from './angular-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { AngularRoutingModule } from './app-routing.module';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ToastrModule } from 'ngx-toastr';
import { TestingpageComponent } from './testing/testingpage/testingpage.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { AuthInterceptor } from './auth/auth-interceptor';


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('Google-OAuth-Client-Id')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('Facebook-App-Id')
  }
]);
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainNavComponent,
    TestingpageComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularRoutingModule,
    LayoutModule,
    HttpClientModule,
    DragDropModule,
    NgxDropzoneModule,

    ToastrModule.forRoot(),
    SocialLoginModule


  ], schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],

  bootstrap: [AppComponent]
})
export class AppModule { }
