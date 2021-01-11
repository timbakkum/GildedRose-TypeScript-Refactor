import { UpdateableItem } from "./../updateable-item";

export class SulfurasItem extends UpdateableItem {
  private legendaryQuality = 80;

  handleUpdate() {
    this.quality = this.legendaryQuality;
    this.sellIn = this.sellIn;
  }
}
