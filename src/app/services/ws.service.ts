import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WsService {
  allTickersUrl: string = 'wss://stream.binance.com:9443/ws/!ticker@arr';

  sub = webSocket(this.allTickersUrl);

  constructor() {}

  getAllTickers() {
    return this.sub;
  }

  getSingleTicker(sym: string) {
    var url = `wss://stream.binance.com:9443/ws/${sym}@ticker`;
    var sub = webSocket(url);

    return sub;
  }
}
