import { Item, UpdateableItem } from "./item";

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
