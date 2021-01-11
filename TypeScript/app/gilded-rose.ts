import {
  AgedBrieItem,
  BackstagePassItem,
  ConjuredItem,
  Item,
  RegularItem,
  SulfurasItem,
  UpdateableItem,
} from "./item";

export class GildedRose {
  private items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  get currentItems() {
    return this.items;
  }

  updateQuality() {
    const updatedItems = this.items.map((item) => {
      const isSelfUpdatableItem = item instanceof UpdateableItem;

      if (isSelfUpdatableItem) {
        return (item as UpdateableItem).handleUpdate();
      } else {
        return GildedRose.parseLegacyItem(item).handleUpdate();
      }
    });

    return (this.items = updatedItems);
  }

  static parseLegacyItem = (item: Item): UpdateableItem => {
    const classMap = {
      "Aged Brie": AgedBrieItem,
      "Sulfuras, Hand of Ragnaros": SulfurasItem,
      "Backstage passes to a TAFKAL80ETC concert": BackstagePassItem,
      Conjured: ConjuredItem,
      default: RegularItem,
    };

    return new (classMap[item.name] || classMap["default"])(
      item.name,
      item.sellIn,
      item.quality
    );
  };
}
