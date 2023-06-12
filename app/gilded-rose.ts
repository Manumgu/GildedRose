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

export class BaseItem extends Item {
  protected hasExpired() {
    return this.sellIn < 0;
  }

  protected decreaseSellInUnit() {
    this.sellIn = this.sellIn - 1;
  }

  protected isMaxQuality() {
    return this.quality === GildedRose.MAX_QUALITY;
  }

  protected modifyItemQuality(amount: number) {
    this.quality = this.quality + amount;
  }

  protected upgradeItemUnit() {
    this.modifyItemQuality(1);
  }

  protected downgradeItemUnit() {
    this.modifyItemQuality(-1);
  }

  updateQuality() {
    if (this.quality > 0) {
      this.downgradeItemUnit();
    }

    this.decreaseSellInUnit();

    if (this.hasExpired() && this.quality > 0) {
      this.downgradeItemUnit();
    }
  }
}

export class AgedBrie extends BaseItem {
  updateQuality() {
    if (!this.isMaxQuality()) {
      this.upgradeItemUnit();
    }

    this.decreaseSellInUnit();

    if (this.hasExpired() && !this.isMaxQuality()) {
      this.upgradeItemUnit();
    }
  }
}

export class Sulfuras extends BaseItem {
  updateQuality() {
    // Quality and sellIn do not change
  }
}

export class BackstagePass extends BaseItem {
  updateQuality() {
    if (!this.isMaxQuality()) {
      this.upgradeItemUnit();

      if (this.sellIn <= 10 && !this.isMaxQuality()) {
        this.upgradeItemUnit();
      }

      if (this.sellIn <= 5 && !this.isMaxQuality()) {
        this.upgradeItemUnit();
      }
    }

    this.decreaseSellInUnit();

    if (this.hasExpired()) {
      this.modifyItemQuality(-this.quality);
    }
  }
}

export class ItemFactory {
  static createItem(name: string, sellIn: number, quality: number): BaseItem {
    switch (name) {
      case "Aged Brie":
        return new AgedBrie(name, sellIn, quality);
      case "Sulfuras, Hand of Ragnaros":
        return new Sulfuras(name, sellIn, quality);
      case "Backstage passes to a TAFKAL80ETC concert":
        return new BackstagePass(name, sellIn, quality);
      default:
        return new BaseItem(name, sellIn, quality);
    }
  }
}

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
