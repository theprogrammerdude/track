import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WsService } from 'src/app/services/ws.service';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css'],
})
export class CoinComponent implements OnInit, OnDestroy {
  sym: string = '';
  coinData: any = {};

  constructor(private ws: WsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((d: any) => {
      // console.log(d);
      this.sym = d.sym;
    });

    this.getData();
  }

  ngOnDestroy(): void {
    this.ws.getSingleTicker(this.sym).unsubscribe();
  }

  getData() {
    this.ws.getSingleTicker(this.sym.toLowerCase()).subscribe((data) => {
      this.coinData = data;
      // console.log(data);
    });
  }

  trimSymbol() {
    return this.sym.substring(0, this.sym.length - 4);
  }

  iconUrl() {
    return `https://cryptoicon-api.vercel.app/api/icon/${this.trimSymbol().toLowerCase()}`;
  }

  date(t: number) {
    return new Date(t).toUTCString();
  }
}
