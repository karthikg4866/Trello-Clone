import {Injectable} from '@angular/core';
import {forkJoin } from 'rxjs';
import {HttpClientService} from '../httpclient';
import {Board} from '../board/board';
import {Column} from '../column/column';
import {Card} from '../card/card';
import { map } from 'rxjs/operators';

@Injectable()
export class BoardService {
  apiUrl = '/board';
  boardsCache: Board[] = [];

  constructor(private _http: HttpClientService) {
  }

  getAll() {
    return this._http.get(this.apiUrl).pipe(map((res) => <Board[]>res["data"]));
  }

  get(id: string) {
    return this._http.get(this.apiUrl + '/' + id).pipe(
      map((res) => <Board>res["data"]));
  }

  getBoardWithColumnsAndCards(id: string){
    return forkJoin(this.get(id), this.getColumns(id), this.getCards(id));
  }

  getColumns(id: string) {
    return this._http.get(this.apiUrl + '/' + id + '/columns').pipe(
      map((res) => <Column[]>res["data"]));
  }

  getCards(id: string) {
    return this._http.get(this.apiUrl + '/' + id + '/cards').pipe(
      map((res) => <Card[]>res["data"]));
  }

  put(board: Board) {
    let body = JSON.stringify(board);
    this._http.put(this.apiUrl + '/' + board._id, body)
      .toPromise()
      .then(res => console.log(res));
  }

  post(board: Board) {
    let body = JSON.stringify(board);
    return this._http.post(this.apiUrl, body).pipe(
      map((res) => <Board>res["data"]));
  }

  delete(board: Board) {
    this._http.delete(this.apiUrl + '/' + board._id)
      .toPromise()
      .then(res => console.log(res));
  }

}
