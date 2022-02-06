import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WsService } from 'src/app/services/ws.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  tickers: Array<any> = [];

  displayedColumns: string[] = [
    'symbol',
    'bid',
    'ask',
    // 'high',
    // 'low',
    // 'volume',
  ];

  selectedTickers: Array<any> = [
    'BTC',
    'BCH',
    'BNB',
    'ADA',
    'ETH',
    'DASH',
    'DOGE',
    'LTC',
    'SHIB',
    'ATOM',
    'DOT',
    'XRP',
    'MKR',
    'YFI',
  ];

  constructor(private ws: WsService, private router: Router) {}

  ngOnInit(): void {
    this.ws.getAllTickers().subscribe((msg: any) => {
      this.tickers = [];
      const tempArr: Array<any> = msg;

      tempArr.forEach((e: any) => {
        var sym: string = e.s;
        // console.log(sym.substring(sym.length - 4, sym.length));

        if (
          sym.substring(sym.length - 4, sym.length) === 'USDT' &&
          this.selectedTickers.includes(sym.substring(0, sym.length - 4))
        )
          this.tickers.push(e);
      });

      // console.log(this.tickers);
    });
  }

  ngOnDestroy(): void {
    // this.ws.sub.unsubscribe();
  }

  trimSymbol(sym: string) {
    return sym.substring(0, sym.length - 4);
  }

  coinData(coin: any) {
    // console.log(coin);

    this.router.navigate(['/coin', coin.s]);
  }

  iconUrl(sym: string) {
    return `https://cryptoicon-api.vercel.app/api/icon/${this.trimSymbol(
      sym
    ).toLowerCase()}`;
  }
}
