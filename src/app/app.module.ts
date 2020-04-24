// DEPENDENCIES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
// PROVIDERS
import { BoardService } from './board/board.service';
import { CardService } from './card/card.service';
import { ColumnService } from './column/column.service';
import { HttpClientService } from './httpclient';
import { WebSocketService } from './ws.service';

// COMPONENTS
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { BoardComponent } from './board/board.component';
import { ColumnComponent } from './column/column.component';
import { CardComponent } from './card/card.component';

// PIPES
import { OrderBy } from './pipes/orderby.pipe';
import { Where } from './pipes/where.pipe';
import { StoreModule } from '@ngrx/store';
import { DashboardReducer } from './dashboard/dashboard.reducer';
import { BoardReducer } from './board/board.reducer';

const appRoutes: Routes = [
  { path: 'b/:id', component: BoardComponent },
  { path: '', component: DashboardComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BoardComponent,
    ColumnComponent,
    CardComponent,
    OrderBy,
    Where,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({ dashboard: DashboardReducer, board: BoardReducer })
  ],
  providers: [HttpClientService, WebSocketService, BoardService, ColumnService, CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
