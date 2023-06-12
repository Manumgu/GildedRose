import { BaseItem } from "./BaseItem";


export class BackstagePassItem extends BaseItem {
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
