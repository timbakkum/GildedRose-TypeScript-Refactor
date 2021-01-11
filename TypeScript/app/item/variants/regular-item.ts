import { Item } from "../item";
import { UpdateableItem } from "./../updateable-item";

export class RegularItem extends UpdateableItem {
  handleUpdate() {
    const deprecationRate =
      this.sellIn <= this.sellInLimit
        ? this.defaultDeprecationRate * 2
        : this.defaultDeprecationRate;
    this.quality = Math.max(this.minQuality, this.quality - deprecationRate);

    this.decreaseSellIn();

    return this as Item;
  }
}
