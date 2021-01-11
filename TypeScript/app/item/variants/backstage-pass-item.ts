import { Item } from "../item";
import { UpdateableItem } from "./../updateable-item";

// N.B. here we assume from the specification that the backstage pass behaviour
// can apply to different item names
// not only those that equal "Backstage passes to a TAFKAL80ETC concert"
export class BackstagePassItem extends UpdateableItem {
  private tenDaysOrLessAppreciationRate = 2;
  private fiveDaysOrLessAppreciationRate = 3;

  handleUpdate() {
    const hasSellByDatePassed = this.sellIn <= this.sellInLimit;

    if (hasSellByDatePassed) {
      this.quality = this.minQuality;
    } else {
      const appreciationRate =
        this.sellIn <= 5
          ? this.fiveDaysOrLessAppreciationRate
          : this.sellIn <= 10
          ? this.tenDaysOrLessAppreciationRate
          : this.defaultDeprecationRate;

      this.quality = Math.min(this.maxQuality, this.quality + appreciationRate);
    }

    this.decreaseSellIn();

    return this as Item;
  }
}
