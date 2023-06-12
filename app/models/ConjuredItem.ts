import { BaseItem } from "./BaseItem";


export class ConjuredItem extends BaseItem {
  updateQuality() {
    if (this.quality > 0) {
      this.modifyItemQuality(-2);
      if (this.quality < 0)
        this.quality = 0;
    }

    this.decreaseSellInUnit();

    if (this.hasExpired() && this.quality > 0) {
      this.modifyItemQuality(-2);
      if (this.hasExpired())
        this.quality = 0;
    }
  }
}
