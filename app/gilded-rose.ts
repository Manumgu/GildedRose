export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  private static readonly MAX_QUALITY: number = 50;
  private items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      if (item.name == "Aged Brie") {
        this.updateBrie(item);
      } else if (item.name == "Sulfuras, Hand of Ragnaros") {
        continue;
      } else if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
        this.updateBackstagePasses(item);
      } else {
        this.updateNormal(item);
      }
    }

    return this.items;
  }

  private updateBrie(item: Item) {
    if (item.quality < GildedRose.MAX_QUALITY) {
      item.quality += 1;
    }

    item.sellIn -= 1;

    if (item.sellIn < 0 && item.quality < GildedRose.MAX_QUALITY) {
      item.quality += 1;
    }
  }

  private updateBackstagePasses(item: Item) {
    if (item.quality < GildedRose.MAX_QUALITY) {
      item.quality += 1;

      if (item.sellIn <= 10 && item.quality < GildedRose.MAX_QUALITY) {
        item.quality += 1;
      }

      if (item.sellIn <= 5 && item.quality < GildedRose.MAX_QUALITY) {
        item.quality += 1;
      }
    }

    item.sellIn -= 1;

    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }

  private updateNormal(item: Item) {
    if (item.quality > 0) {
      item.quality -= 1;
    }

    item.sellIn -= 1;

    if (item.sellIn < 0 && item.quality > 0) {
      item.quality -= 1;
    }
  }
}
