import {Injectable} from '@angular/core';
import {forkJoin } from 'rxjs';
import {HttpClientService} from '../httpclient';
import {Board} from '../board/board';
import {Column} from '../column/column';
import {Card} from '../card/card';
import { map } from 'rxjs/operators';
@Injectable({providedIn: 'root'})
export class BoardService {
  apiUrl = '/board';
  boardsCache: Board[] = [];

  constructor(private http: HttpClientService) {
  }

  getAll() {
    return this.http.get(this.apiUrl).pipe(map((res: any) => res.data as Board[]));
  }

  get(id: string) {
    return this.http.get(this.apiUrl + '/' + id).pipe(
      map((res: any) => res.data as Board));
  }

  getBoardWithColumnsAndCards(id: string) {
    return forkJoin(this.get(id), this.getColumns(id), this.getCards(id));
  }

  getColumns(id: string) {
    return this.http.get(this.apiUrl + '/' + id + '/columns').pipe(
      map((res: any) => res.data as Column[]));
  }

  getCards(id: string) {
    return this.http.get(this.apiUrl + '/' + id + '/cards').pipe(
      map((res: any) => res.data as Card[]));
  }

  put(board: Board) {
    const body = JSON.stringify(board);
    this.http.put(this.apiUrl + '/' + board._id, body)
      .toPromise()
      .then(res => console.log(res));
  }

  post(board: Board) {
    const body = JSON.stringify(board);
    return this.http.post(this.apiUrl, body).pipe(
      map((res: any) => res.data as Board));
  }

  delete(board: Board) {
    return this.http.delete(this.apiUrl + '/' + board._id).pipe(map((res: any) => res));
  }

}
