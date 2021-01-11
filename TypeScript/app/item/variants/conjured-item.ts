import { Item } from "./../item";
import { UpdateableItem } from "./../updateable-item";

export class ConjuredItem extends UpdateableItem {
  handleUpdate() {
    if (this.quality > 2) {
      this.quality = this.quality - this.defaultDeprecationRate * 2;
    }
    if (this.quality <= 2) {
      this.quality = this.minQuality;
    }

    this.decreaseSellIn();

    return this as Item;
  }
}
