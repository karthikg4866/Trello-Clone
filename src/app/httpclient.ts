import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ROOT_URL } from './constants';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept': 'application/json'
  })
};
@Injectable()
export class HttpClientService {

  rootUrl = ROOT_URL;

  constructor(private http: HttpClient) {
  }

  public get(url: string, headers?: any) {
    url = this.handleUrl(url);
    return this.http.get(url, headers || httpOptions);
  }

  public post(url: string, body: string, headers?: any) {
    url = this.handleUrl(url);
    return this.http.post(url, body, headers || httpOptions);
  }

  public put(url: string, body: string, headers?: any) {
    url = this.handleUrl(url);
    return this.http.put(url, body, headers || httpOptions);
  }

  public delete(url: string, headers?: any) {
    url = this.handleUrl(url);
    return this.http.delete(url, headers || httpOptions);
  }

  private handleUrl(url: string): string {
    if (!this.checkUrlExternal(url)) {
      if (url.charAt(0) === '/') { url = url.substring(1); }
      url = this.rootUrl + url;
    }
    return url;
  }

  private checkUrlExternal(url: string): boolean {
    return /^(?:[a-z]+:)?\/\//i.test(url);
  }

}
