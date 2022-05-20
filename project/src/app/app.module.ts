import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { CardComponent } from './card/card.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PriceDepthComponent } from './price-depth/price-depth.component';
import { MatTableModule } from '@angular/material/table';
import { DepthScalperComponent } from './depth-scalper/depth-scalper.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    CardComponent,
    PriceDepthComponent,
    DepthScalperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatTableModule,
    MatDialogModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
