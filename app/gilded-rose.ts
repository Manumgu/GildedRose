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

  private static hasExpired(item: Item) {
    return item.sellIn < 0;
  }

  private static decreaseSellInUnit(item: Item) {
    item.sellIn = item.sellIn - 1;
  }

  private static isMaxQuality(item: Item) {
    return item.quality === GildedRose.MAX_QUALITY;
  }

  private static modifyItemQuality(item: Item, amount: number) {
    item.quality = item.quality + amount;
  }

  private static upgradeItemUnit(item: Item) {
    GildedRose.modifyItemQuality(item, 1);
  }

  private static downgradeItemUnit(item: Item) {
    GildedRose.modifyItemQuality(item, -1);
  }

  private updateBrie(item: Item) {
    if (item.quality < GildedRose.MAX_QUALITY) {
      GildedRose.upgradeItemUnit(item);
    }

    GildedRose.decreaseSellInUnit(item);

    if (GildedRose.hasExpired(item) && !GildedRose.isMaxQuality(item)) {
      GildedRose.upgradeItemUnit(item);
    }
  }

  private updateBackstagePasses(item: Item) {
    if (!GildedRose.isMaxQuality(item)) {
      GildedRose.upgradeItemUnit(item);

      if (item.sellIn <= 10 && !GildedRose.isMaxQuality(item)) {
        GildedRose.upgradeItemUnit(item);
      }

      if (item.sellIn <= 5 && !GildedRose.isMaxQuality(item)) {
        GildedRose.upgradeItemUnit(item);
      }
    }

    GildedRose.decreaseSellInUnit(item);

    if (GildedRose.hasExpired(item)) {
      GildedRose.modifyItemQuality(item, -item.quality);
    }
  }

  private updateNormal(item: Item) {
    if (item.quality > 0) {
      GildedRose.downgradeItemUnit(item);
    }

    GildedRose.decreaseSellInUnit(item);

    if (GildedRose.hasExpired(item) && item.quality > 0) {
      GildedRose.downgradeItemUnit(item);
    }
  }
}
