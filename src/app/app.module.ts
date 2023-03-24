import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { LogsComponent } from './pages/logs/logs.component';
import { SharedModule } from '@shared/shared.module';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskDirective, provideNgxMask, NgxMaskPipe } from 'ngx-mask';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';

defineLocale('es', esLocale);
@NgModule({
	declarations: [AppComponent, HomeComponent, LogsComponent],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		SharedModule,
		BsDatepickerModule.forRoot(),
		NgxDropzoneModule,
		NgxMaskDirective,
		NgxMaskPipe,
		ToastrModule.forRoot(),
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideDatabase(() => getDatabase()),
		provideStorage(() => getStorage()),
	],
	providers: [provideNgxMask()],
	bootstrap: [AppComponent],
})
export class AppModule {
	constructor(private bsLocaleService: BsLocaleService) {
		this.bsLocaleService.use('es'); //datepicker in spanish
	}
}
