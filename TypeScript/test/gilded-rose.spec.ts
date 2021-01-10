import { Item, GildedRose } from "../app/gilded-rose";

describe("Gilded Rose", function () {
  it("should initialize items", function () {
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("+5 Dexterity Vest");
  });

  it("should handle updating regular items correctly", () => {
    const regularItem = new Item("+5 Dexterity Vest", 2, 4);
    const gildedRose = new GildedRose([regularItem]);

    expect(regularItem.sellIn).toEqual(2);
    expect(regularItem.quality).toEqual(4);

    gildedRose.updateQuality();
    expect(regularItem.sellIn).toEqual(1);
    expect(regularItem.quality).toEqual(3);

    gildedRose.updateQuality();
    expect(regularItem.sellIn).toEqual(0);
    expect(regularItem.quality).toEqual(2);

    gildedRose.updateQuality();
    // now quality decreases by -2
    expect(regularItem.sellIn).toEqual(-1);
    expect(regularItem.quality).toEqual(0);

    gildedRose.updateQuality();
    // quality never goes below 0
    expect(regularItem.sellIn).toEqual(-2);
    expect(regularItem.quality).toEqual(0);
  });

  it('should handle updating "Aged Brie" correctly', () => {
    const agedBrie = new Item("Aged Brie", 2, 0);
    const gildedRose = new GildedRose([agedBrie]);

    // quality increases normally when sellIn positive
    expect(agedBrie.sellIn).toEqual(2);
    expect(agedBrie.quality).toEqual(0);

    gildedRose.updateQuality();
    expect(agedBrie.sellIn).toEqual(1);
    expect(agedBrie.quality).toEqual(1);

    gildedRose.updateQuality();
    expect(agedBrie.sellIn).toEqual(0);
    expect(agedBrie.quality).toEqual(2);

    gildedRose.updateQuality();
    // quality now start to double
    expect(agedBrie.sellIn).toEqual(-1);
    expect(agedBrie.quality).toEqual(4);

    for (let index = 0; index < 25; index++) {
      gildedRose.updateQuality();
    }
    // quality never exceeds 50
    expect(agedBrie.quality).not.toBeGreaterThan(50);
  });

  it("should handle updating backstage passes correctly", () => {
    // eslint-disable-next-line max-len
    const backstagePasses = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      11,
      25
    );
    const gildedRose = new GildedRose([backstagePasses]);

    gildedRose.updateQuality();
    expect(backstagePasses.sellIn).toEqual(10);
    expect(backstagePasses.quality).toEqual(26);

    gildedRose.updateQuality();
    // 10 days left to sell, so quality +2
    expect(backstagePasses.sellIn).toEqual(9);
    expect(backstagePasses.quality).toEqual(28);

    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    // 5 days left to sell, so quality + 3
    expect(backstagePasses.sellIn).toEqual(4);
    expect(backstagePasses.quality).toEqual(39);

    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    // last day to sell
    expect(backstagePasses.sellIn).toEqual(0);
    expect(backstagePasses.quality).toEqual(50);

    gildedRose.updateQuality();
    // concert has happened, pass is worthless
    expect(backstagePasses.sellIn).toEqual(-1);
    expect(backstagePasses.quality).toEqual(0);
  });

  it('handles updating "Sulfuras" correctly', () => {
    const sulfuras = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
    const gildedRose = new GildedRose([sulfuras]);

    expect(sulfuras.sellIn).toEqual(0);
    expect(sulfuras.quality).toEqual(80);

    gildedRose.updateQuality();
    expect(sulfuras.sellIn).toEqual(0);
    expect(sulfuras.quality).toEqual(80);

    gildedRose.updateQuality();
    expect(sulfuras.sellIn).toEqual(0);
    expect(sulfuras.quality).toEqual(80);
  });
});
