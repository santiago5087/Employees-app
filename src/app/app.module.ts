import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// App modules
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

// Components
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';

// Angular Material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { EmpCreateComponent } from './components/emp-create/emp-create.component';
import { EmpComponent } from './components/emp/emp.component';
import { EmpEditComponent } from './components/emp-edit/emp-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    EmpCreateComponent,
    EmpComponent,
    EmpEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
