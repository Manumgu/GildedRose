import { Item } from "./Item";
import { GildedRose } from "../gilded-rose";


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
