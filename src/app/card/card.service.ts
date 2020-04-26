import {Injectable} from '@angular/core';
import {HttpClientService} from '../httpclient';
import {Card} from '../card/card';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class CardService {
  apiUrl = '/card';
  resData:any;
  constructor(private _http: HttpClientService) {
  }

  getAll() {
    return this._http.get(this.apiUrl).pipe(
      map(res => res));
  }

  get(id: string) {
    return this._http.get(this.apiUrl + '/' + id).pipe(
      map(res => res));
  }

  put(card: Card) {
    return this._http.put(this.apiUrl + '/' + card._id, JSON.stringify(card));
  }

  post(card: Card) {
    return this._http.post(this.apiUrl, JSON.stringify(card)).pipe(
      map(res => <Card>res["data"]));
  }

  delete(card: Card) {
    return this._http.delete(this.apiUrl + '/' + card._id)
      .toPromise();
  }

}
