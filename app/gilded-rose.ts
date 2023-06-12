import { BaseItem } from "./BaseItem";

export class GildedRose {
  public static readonly MAX_QUALITY: number = 50;
  private items: Array<BaseItem>;

  constructor(items = [] as Array<BaseItem>) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      item.updateQuality();
    }

    return this.items;
  }
}
