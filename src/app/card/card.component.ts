import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { Card } from './card';
import { CardService } from './card.service';
import { Store } from '@ngrx/store';
import { UpdateCard, GetCard } from '../board/board.actions';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input()
  card: Card;
  @Output() cardUpdate: EventEmitter<Card>;
  editingCard = false;
  currentTitle: string;
  zone: NgZone;
  constructor(private el: ElementRef,
    private store: Store,
    private _ref: ChangeDetectorRef,
    private _cardService: CardService) {
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.cardUpdate = new EventEmitter();
  }

  ngOnInit() {
    this.currentTitle = this.card.title;
  }

  blurOnEnter(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    } else if (event.keyCode === 27) {
      this.card.title = this.currentTitle;
      this.editingCard = false;
    }
  }

  editCard() {
    this.editingCard = true;
    this.currentTitle = this.card.title;

    let textArea = this.el.nativeElement.getElementsByTagName('textarea')[0];

    setTimeout(function () {
      textArea.focus();
    }, 0);
  }

  updateCard() {
    let cardUpdated = {...this.card};
    if (this.currentTitle && this.card.title || this.card.title.trim() !== '') {
      cardUpdated.title = this.currentTitle;
    }
    this.store.dispatch(new UpdateCard(cardUpdated));
    this.store.dispatch(new GetCard(this.card.boardId));
    this.editingCard = false;
  }

}
