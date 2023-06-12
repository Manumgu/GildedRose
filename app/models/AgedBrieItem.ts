import { BaseItem } from "./BaseItem";


export class AgedBrieItem extends BaseItem {
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
