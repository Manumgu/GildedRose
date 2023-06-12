import { BaseItem } from "./BaseItem";


export class SulfurasItem extends BaseItem {
  private static readonly DEFAULT_QUALITY = 80;

  constructor(name: string) {
    super(name, 0, SulfurasItem.DEFAULT_QUALITY);
  }

  updateQuality() {
  }
}
