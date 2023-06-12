import { AgedBrieItem } from "../models/AgedBrieItem";
import { BackstagePassItem } from "../models/BackstagePassItem";
import { BaseItem } from "../models/BaseItem";
import { ConjuredItem } from "../models/ConjuredItem";
import { SulfurasItem } from "../models/SulfurasItem";


export class ItemFactory {
  static createItem(name: string, sellIn: number, quality: number): BaseItem {
    if (name === 'Aged Brie') {
      return new AgedBrieItem(name, sellIn, quality);
    } else if (name === 'Sulfuras, Hand of Ragnaros') {
      return new SulfurasItem(name);
    } else if (name === 'Backstage passes to a TAFKAL80ETC concert') {
      return new BackstagePassItem(name, sellIn, quality);
    } else if (name.startsWith('Conjured')) {
      return new ConjuredItem(name, sellIn, quality);
    } else {
      return new BaseItem(name, sellIn, quality);
    }
  }
}
