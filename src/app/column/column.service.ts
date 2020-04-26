import {Injectable} from '@angular/core';
import { HttpClientService} from '../httpclient'
import {Column} from '../column/column';
import {Card} from '../card/card';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ColumnService {
  apiUrl = '/column';

  constructor(private _http: HttpClientService) {
  }

  getAll() {
    return this._http.get(this.apiUrl)
      .pipe(map(res => <Column[]>res["data"]));
  }

  get(id: string) {
    return this._http.get(this.apiUrl + '/' + id)
      .pipe(map(res => <Column>res["data"]));
  }

  getCards(id: string) {
    return this._http.get(this.apiUrl + '/' + id + '/cards')
      .pipe(map(res => <Card[]>res["data"]));
  }

  put(column: Column) {
    console.log("column service");
    console.log(column)
    return this._http
      .put(this.apiUrl + '/' + column._id, JSON.stringify(column));
  }

  post(column: Column) {;
    return this._http.post(this.apiUrl, JSON.stringify(column))
      .pipe(map(res => <Column>res["data"]));
  }

  delete(column: Column) {
    return this._http.delete(this.apiUrl + '/' + column._id)
      .toPromise();

  }

}
