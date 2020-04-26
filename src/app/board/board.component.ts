import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Board } from '../board/board';
import { Column } from '../column/column';
import { Card } from '../card/card';
import { BoardService } from './board.service';
import { ColumnService } from '../column/column.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { GetBoardbyId, GetCard, GetColumns, AddColumn, UpdateColumn } from './board.actions';
import { boardState, BoardState } from './board.reducer';

declare var jQuery: any;
var curYPos = 0,
  curXPos = 0,
  curDown = false;

@Component({
  selector: 'gtm-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board: Board;
  addingColumn = false;
  addColumnText: string;
  editingTilte = false;
  currentTitle: string;
  boardWidth: number;
  columnsAdded: number = 0;
  count$: Observable<number>;

  constructor(public el: ElementRef,
    private _boardService: BoardService,
    private _columnService: ColumnService,
    private _router: Router,
    private _route: ActivatedRoute,
    private store: Store<AppState>) {

  }

  ngOnInit() {
    this.currentTitle = (this.board && this.board.title) ? this.board.title : '';
    let boardId = this._route.snapshot.params['id'];
    this.store.dispatch(new GetBoardbyId(boardId));
    this.store.dispatch(new GetColumns(boardId));
    this.store.dispatch(new GetCard(boardId));
    this.store.select("board").subscribe((boardStateData: BoardState) => {
      this.board = { ...boardStateData };
      console.log(this.board)
      this.currentTitle = this.board.title;
      document.title = this.board.title + " | Generic Task Manager";
      this.setupView();
    });
  }

  setupView() {
    let component = this;
    setTimeout(function () {
      var startColumn;
      jQuery('#main').sortable({
        items: '.sortable-column',
        handler: '.header',
        connectWith: "#main",
        placeholder: "column-placeholder",
        dropOnEmpty: true,
        tolerance: 'pointer',
        start: function (event, ui) {
          ui.placeholder.height(ui.item.find('.column').outerHeight());
          startColumn = ui.item.parent();
        },
        stop: function (event, ui) {
          var columnId = ui.item.find('.column').attr('column-id');

          component.updateColumnOrder({
            columnId: columnId
          });
        }
      }).disableSelection();
    });
  }


  updateBoard() {
    console.log("update board..........");
    if (this.board.title && this.board.title.trim() !== '' && this.currentTitle.toLowerCase() !== this.board.title.toLowerCase()) {
      this.board.title = this.currentTitle;
      this._boardService.put(this.board);
    }
    // else {
    //   this.board.title = this.currentTitle;
    // }
    this.editingTilte = false;
    document.title = this.board.title + " | Generic Task Manager";
  }

  editTitle() {
    //  this.currentTitle = this.board.title;
    this.editingTilte = true;

    let input = this.el.nativeElement
      .getElementsByClassName('board-title')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function () { input.focus(); }, 0);
  }

  updateColumnOrder(event) {
    let i: number = 0,
      elBefore: number = -1,
      elAfter: number = -1,
      newOrder: number = 0,
      columnEl = jQuery('#main'),
      columnArr = columnEl.find('.column');

    for (i = 0; i < columnArr.length - 1; i++) {
      if (columnEl.find('.column')[i].getAttribute('column-id') == event.columnId) {
        break;
      }
    }

    if (i > 0 && i < columnArr.length - 1) {
      elBefore = +columnArr[i - 1].getAttribute('column-order');
      elAfter = +columnArr[i + 1].getAttribute('column-order');

      newOrder = elBefore + ((elAfter - elBefore) / 2);
    }
    else if (i == columnArr.length - 1) {
      elBefore = +columnArr[i - 1].getAttribute('column-order');
      newOrder = elBefore + 1000;
    } else if (i == 0) {
      elAfter = +columnArr[i + 1].getAttribute('column-order');

      newOrder = elAfter / 2;
    }

    let column = JSON.parse(JSON.stringify(this.board)).columns.filter(x => x._id === event.columnId)[0];
    column.order = newOrder;
    this.store.dispatch(new UpdateColumn(column));
  }


  blurOnEnter(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    }
  }

  enableAddColumn() {
    this.addingColumn = true;
    let input = jQuery('.add-column')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function () { input.focus(); }, 0);
  }

  addColumn() {
    console.log("column addede")
    let newColumn = <Column>{
      title: this.addColumnText,
      order: (this.board.columns.length + 1) * 1000,
      boardId: this.board._id
    };
    this.store.dispatch(new AddColumn(newColumn));
    this.addColumnText = '';
  }

  addColumnOnEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      if (this.addColumnText && this.addColumnText.trim() !== '') {
        this.addColumn();
      } else {
        this.clearAddColumn();
      }
    }
    else if (event.keyCode === 27) {
      this.clearAddColumn();
    }
  }

  addColumnOnBlur() {
    if (this.addColumnText && this.addColumnText.trim() !== '') {
      this.addColumn();
    }
    this.clearAddColumn();
  }

  clearAddColumn() {
    this.addingColumn = false;
    this.addColumnText = '';
  }

  // foreceUpdateCards() {
  //   var cards = JSON.stringify(this.board.cards);
  //   this.board.cards = JSON.parse(cards);
  // }


  // onCardUpdate(card: Card) {
  //   this.foreceUpdateCards();
  // }

}
