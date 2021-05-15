import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core'
import { BrowserModule } from '@angular/platform-browser';

// Animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// App modules
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { EmpComponent } from './components/emp/emp.component';
import { EmpFormComponent } from './components/emp-form/emp-form.component';

// Angular Material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    EmpComponent,
    EmpFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
