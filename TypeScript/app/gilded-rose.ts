/* eslint-disable require-jsdoc */
export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

// @FIXME ideally we want to update item to be an abstract class
// so we don't have to typecast later on
export abstract class UpdateableItem extends Item {
  protected minQuality = 0;
  protected maxQuality = 50;
  protected sellInLimit = 0; // @FIXME think of better naming?
  protected defaultDeprecationRate = 1;

  abstract handleUpdate(): void;
}

export class ConjuredItem extends UpdateableItem {
  handleUpdate() {
    if (this.quality > 2) {
      this.quality = this.quality - this.defaultDeprecationRate * 2;
    }
    if (this.quality < 2) {
      this.quality = this.minQuality;
    }

    this.sellIn = this.sellIn - 1;
  }
}

export class RegularItem extends UpdateableItem {
  handleUpdate() {
    const deprecationRate =
      this.sellIn <= this.sellInLimit
        ? this.defaultDeprecationRate * 2
        : this.defaultDeprecationRate;
    this.quality = Math.max(this.minQuality, this.quality - deprecationRate);

    this.sellIn = this.sellIn - 1;
  }
}

// N.B. here we assume from the specification that the backstage pass behaviour can apply to different item names
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

    this.sellIn = this.sellIn - 1;
  }
}

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

export class SulfurasItem extends UpdateableItem {
  private legendaryQuality = 80;

  handleUpdate() {
    this.quality = this.legendaryQuality;
    this.sellIn = this.sellIn;
  }
}

export class GildedRose {
  private items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  get currentItems() {
    return this.items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i];

      const isSelfUpdatableItem = currentItem instanceof UpdateableItem;

      if (isSelfUpdatableItem) {
        (currentItem as UpdateableItem).handleUpdate();
      } else {
        // all legacy Item objects will be treated by legacy code
        if (
          currentItem.name !== "Aged Brie" &&
          currentItem.name !== "Backstage passes to a TAFKAL80ETC concert"
        ) {
          if (currentItem.quality > 0) {
            if (currentItem.name !== "Sulfuras, Hand of Ragnaros") {
              // this block handles decreasing of quality of "regular" items
              currentItem.quality = currentItem.quality - 1;
            }
          }
        } else if (currentItem.quality < 50) {
          // this block handles increasing of quality
          // of "brie" and "backstage passes"
          currentItem.quality = currentItem.quality + 1;

          if (
            currentItem.name === "Backstage passes to a TAFKAL80ETC concert"
          ) {
            // this block handles "backstage passes" items
            if (currentItem.sellIn < 11) {
              if (currentItem.quality < 50) {
                currentItem.quality = currentItem.quality + 1;
              }
            }
            if (currentItem.sellIn < 6) {
              if (currentItem.quality < 50) {
                currentItem.quality = currentItem.quality + 1;
              }
            }
          }
        }
        if (currentItem.name !== "Sulfuras, Hand of Ragnaros") {
          // this block handles decreasing of sellIn of all items
          // except legendary (decrease n.a.)
          currentItem.sellIn = currentItem.sellIn - 1;
        }
        if (currentItem.sellIn < 0) {
          if (currentItem.name !== "Aged Brie") {
            if (
              currentItem.name !== "Backstage passes to a TAFKAL80ETC concert"
            ) {
              if (currentItem.quality > 0) {
                if (currentItem.name !== "Sulfuras, Hand of Ragnaros") {
                  // this block handles decreasing of quality
                  // of normal items when sellIn hasn't dropped below 0

                  currentItem.quality = currentItem.quality - 1;
                }
              }
            } else {
              // this block handles sets "backstage passes" quality to 0
              // after the concert has happened

              currentItem.quality = currentItem.quality - currentItem.quality;
            }
          } else if (currentItem.quality < 50) {
            // this block handles the increasing of "brie"
            // even when it's past it sell by date
            currentItem.quality = currentItem.quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
