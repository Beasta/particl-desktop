import { Injectable } from '@angular/core';

import { MarketService } from 'app/core/market/market.service';
import { MarketStateService } from 'app/core/market/market-state/market-state.service';

@Injectable()
export class ListingService {

  constructor(
    private market: MarketService,
    private marketState: MarketStateService
  ) {

  }

  search(page: number, pageLimit: number, profileId: number | string, search: string) {
    let params = [
      'search',
      page,
      pageLimit,
      'ASC',
      null, // category
      'ALL', 
      profileId || "ALL",
      null, // minPrice
      null, // maxPrice
      null, // country
      null, // shippingDestination
      search || null, // search
      true // withRelated
    ];

    return this.market.call('item', params);
  }

  searchOwn(page: number, pageLimit: number) {
    return this.search(page, pageLimit, "*", null); // OWN
  }

  get(id) {
    return this.market.call('item', ['get', id]);
  }

  generateListing() {
    console.log('generating listing');
    return this.market.call('data', ['generate', 'listingitem', 1, true]);
  }

}