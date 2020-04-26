import { Component, Input, Output, OnInit, EventEmitter, ElementRef } from '@angular/core';
import { Column } from './column';
import { Card } from '../card/card';
import { AddCard, UpdateCard, UpdateColumn, GetColumns } from '../board/board.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';

declare var jQuery: any;

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent implements OnInit {
  @Input()
  column: Column;
  @Input()
  cards: Card[];
  @Output()
  public onAddCard: EventEmitter<Card>;
  @Output() cardUpdate: EventEmitter<Card>;

  editingColumn = false;
  addingCard = false;
  addCardText: string;
  currentTitle: string;

  constructor(private el: ElementRef,
              private store: Store<AppState>) {
    this.onAddCard = new EventEmitter();
    this.cardUpdate = new EventEmitter();
  }

  ngOnInit() {
    this.setupView();
    this.currentTitle = this.column.title;
  }

  setupView() {
    const component = this;
    var startColumn;
    jQuery('.card-list').sortable({
      connectWith: '.card-list',
      placeholder: 'card-placeholder',
      dropOnEmpty: true,
      tolerance: 'pointer',
      start: function (event, ui) {
        ui.placeholder.height(ui.item.outerHeight());
        startColumn = ui.item.parent();
      },
      stop: function (event, ui) {
        var senderColumnId = startColumn.attr('column-id');
        var targetColumnId = ui.item.closest('.card-list').attr('column-id');
        var cardId = ui.item.find('.card').attr('card-id');

        component.updateCardsOrder({
          columnId: targetColumnId || senderColumnId,
          cardId: cardId
        });
      }
    });
    jQuery('.card-list').disableSelection();
  }

  updateCardsOrder(event) {
    let cardArr = jQuery('[column-id=' + event.columnId + '] .card');
    let i: number = 0;
    let elBefore: number = -1;
    let elAfter: number = -1;
    let newOrder: number = 0;

    for (i = 0; i < cardArr.length - 1; i++) {
      if (cardArr[i].getAttribute('card-id') == event.cardId) {
        break;
      }
    }

    if (cardArr.length > 1) {
      if (i > 0 && i < cardArr.length - 1) {
        elBefore = +cardArr[i - 1].getAttribute('card-order');
        elAfter = +cardArr[i + 1].getAttribute('card-order');

        newOrder = elBefore + ((elAfter - elBefore) / 2);
      }
      else if (i == cardArr.length - 1) {
        elBefore = +cardArr[i - 1].getAttribute('card-order');
        newOrder = elBefore + 1000;
      } else if (i == 0) {
        elAfter = +cardArr[i + 1].getAttribute('card-order');

        newOrder = elAfter / 2;
      }
    } else {
      newOrder = 1000;
    }

    const cardNewOrder =  JSON.parse(JSON.stringify(this.cards));
    const cardUpdate = cardNewOrder.filter(x => x._id === event.cardId)[0];
    cardUpdate.order = newOrder;
    cardUpdate.columnId = event.columnId;
    this.store.dispatch(new UpdateCard(cardUpdate));
  }

  blurOnEnter(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    }
  }

  addColumnOnEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.updateColumn();
    } else if (event.keyCode === 27) {
      this.cleadAddColumn();
    }
  }

  addCard() {
    this.cards = this.cards || [];
    const newCard = <Card>{
      title: this.addCardText,
      order: (this.cards.length + 1) * 1000,
      columnId: this.column._id,
      boardId: this.column.boardId
    };
    this.store.dispatch(new AddCard(newCard));
  }

  addCardOnEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      if (this.addCardText && this.addCardText.trim() !== '') {
        this.addCard();
        this.addCardText = '';
      } else {
        this.clearAddCard();
      }
    } else if (event.keyCode === 27) {
      this.clearAddCard();
    }
  }

  updateColumn() {
    const columnUpdated = { ...this.column };
    if (this.currentTitle && this.column.title && this.column.title.trim() !== '') {
      columnUpdated.title = this.currentTitle;
      this.store.dispatch(new UpdateColumn(columnUpdated));
      this.store.dispatch(new GetColumns(columnUpdated.boardId));
      this.editingColumn = false;
    } else {
      this.cleadAddColumn();
    }
  }

  cleadAddColumn() {
    this.editingColumn = false;
  }

  editColumn() {
    this.currentTitle = this.column.title;
    this.editingColumn = true;
    const input = this.el.nativeElement
      .getElementsByClassName('column-header')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function () { input.focus(); }, 0);
  }

  enableAddCard() {
    this.addingCard = true;
    const input = this.el.nativeElement
      .getElementsByClassName('add-card')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function () { input.focus(); }, 0);
  }


  updateColumnOnBlur() {
    if (this.editingColumn) {
      this.updateColumn();
      this.clearAddCard();
    }
  }


  addCardOnBlur() {
    if (this.addingCard) {
      if (this.addCardText && this.addCardText.trim() !== '') {
        this.addCard();
      }
    }
    this.clearAddCard();
  }

  clearAddCard() {
    this.addingCard = false;
    this.addCardText = '';
  }

  onCardUpdate(card: Card) {
    this.cardUpdate.emit(card);
  }
}
