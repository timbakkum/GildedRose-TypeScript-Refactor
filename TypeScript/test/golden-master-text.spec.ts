import { Item, GildedRose } from "../app/gilded-rose";

const items = [
  new Item("+5 Dexterity Vest", 10, 20), //
  new Item("Aged Brie", 2, 0), //
  new Item("Elixir of the Mongoose", 5, 7), //
  new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
  // this conjured item does not work properly yet
  // new Item("Conjured Mana Cake", 3, 6)
];

const gildedRose = new GildedRose(items);
const days = 31;
const daysArray = Array.from(Array(days), (_, i) => i);
describe("golden master text test", () => {
  test.each(daysArray)("day %i", (day) => {
    let textSnapshot = `-------- day ${day} -------- \n`;
    textSnapshot += "name, sellIn, quality \n";
    items.forEach((element) => {
      textSnapshot += `${element.name} ${element.sellIn} ${element.quality}\n`;
    });
    expect(textSnapshot).toMatchSnapshot();
    gildedRose.updateQuality();
  });
});
