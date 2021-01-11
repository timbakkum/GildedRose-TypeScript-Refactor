import { UpdateableItem } from "./../updateable-item";

// @FIXME ideally you would want to name this in a more generic way.
// For example: AgedItem
// but the specifications and test data are not clear on whether it can be
export class AgedBrieItem extends UpdateableItem {
  private defaultAppreciationRate = 1;
  private pastSellByDateAppreciationRate = 2;

  handleUpdate() {
    const appreciationRate =
      this.sellIn > this.sellInLimit
        ? this.defaultAppreciationRate
        : this.pastSellByDateAppreciationRate;

    this.quality = Math.min(this.maxQuality, this.quality + appreciationRate);
    this.sellIn = this.sellIn - 1;
  }
}
