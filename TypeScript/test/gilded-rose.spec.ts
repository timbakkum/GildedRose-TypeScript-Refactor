import { GildedRose } from "../app/gilded-rose";
import { Item, UpdateableItem } from "./../app/item";

describe("Gilded Rose", function () {
  it("should initialize items", function () {
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("+5 Dexterity Vest");
  });

  it("parseLegacyItems should make the Item an UpdateableItem", () => {
    const parsedItem = GildedRose.parseLegacyItem(
      new Item("+5 Dexterity Vest", 10, 20)
    );

    expect(parsedItem instanceof UpdateableItem).toBe(true);
  });

  it("should handle updating regular items correctly", () => {
    const regularItem = new Item("+5 Dexterity Vest", 2, 4);
    const gildedRose = new GildedRose([regularItem]);
    let items = gildedRose.currentItems;

    expect(items[0].sellIn).toEqual(2);
    expect(items[0].quality).toEqual(4);

    items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(1);
    expect(items[0].quality).toEqual(3);

    items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(0);
    expect(items[0].quality).toEqual(2);

    items = gildedRose.updateQuality();
    // now quality decreases by -2
    expect(items[0].sellIn).toEqual(-1);
    expect(items[0].quality).toEqual(0);

    items = gildedRose.updateQuality();
    // quality never goes below 0
    expect(items[0].sellIn).toEqual(-2);
    expect(items[0].quality).toEqual(0);
  });

  it('should handle updating "Aged Brie" correctly', () => {
    const agedBrie = new Item("Aged Brie", 2, 0);
    const gildedRose = new GildedRose([agedBrie]);
    let items = gildedRose.currentItems;

    // quality increases normally when sellIn positive
    expect(items[0].sellIn).toEqual(2);
    expect(items[0].quality).toEqual(0);

    items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(1);
    expect(items[0].quality).toEqual(1);

    items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(0);
    expect(items[0].quality).toEqual(2);

    items = gildedRose.updateQuality();
    // quality now start to double
    expect(items[0].sellIn).toEqual(-1);
    expect(items[0].quality).toEqual(4);

    for (let index = 0; index < 25; index++) {
      gildedRose.updateQuality();
    }
    items = gildedRose.currentItems;
    // quality never exceeds 50
    expect(items[0].quality).not.toBeGreaterThan(50);
  });

  it("should handle updating backstage passes correctly", () => {
    // eslint-disable-next-line max-len
    const backstagePasses = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      11,
      25
    );
    const gildedRose = new GildedRose([backstagePasses]);

    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(10);
    expect(items[0].quality).toEqual(26);

    items = gildedRose.updateQuality();
    // 10 days left to sell, so quality +2
    expect(items[0].sellIn).toEqual(9);
    expect(items[0].quality).toEqual(28);

    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    // 5 days left to sell, so quality + 3
    expect(items[0].sellIn).toEqual(4);
    expect(items[0].quality).toEqual(39);

    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    // last day to sell
    expect(items[0].sellIn).toEqual(0);
    expect(items[0].quality).toEqual(50);

    items = gildedRose.updateQuality();
    // concert has happened, pass is worthless
    expect(items[0].sellIn).toEqual(-1);
    expect(items[0].quality).toEqual(0);
  });

  it('handles updating "Sulfuras" correctly', () => {
    const sulfuras = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
    const gildedRose = new GildedRose([sulfuras]);
    let items = gildedRose.currentItems;

    expect(items[0].sellIn).toEqual(0);
    expect(items[0].quality).toEqual(80);

    items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(0);
    expect(items[0].quality).toEqual(80);

    items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(0);
    expect(items[0].quality).toEqual(80);
  });

  it('handles updating "conjured" items correctly', () => {
    const conjuredItem = new Item("Conjured", 3, 6);
    const gildedRose = new GildedRose([conjuredItem]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(2);
    expect(items[0].quality).toEqual(4);
  });
});
