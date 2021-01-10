import { Item, GildedRose } from '../app/gilded-rose';

const testItems = [
    new Item("+5 Dexterity Vest", 10, 20), //
    new Item("Aged Brie", 2, 0), //
    new Item("Elixir of the Mongoose", 5, 7), //
    new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
    new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    // this conjured item does not work properly yet
    new Item("Conjured Mana Cake", 3, 6)];

describe('Gilded Rose', function () {

    it('should initialize items', function() {
        const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 10, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual('+5 Dexterity Vest');
    });

    it('should update correctly', () => {
        const gildedRose = new GildedRose(testItems);
        const initialItems = gildedRose.currentItems;

        expect(initialItems[0].sellIn).toEqual(10);
        expect(initialItems[0].quality).toEqual(20);

        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(9);
        expect(items[0].quality).toEqual(19);
    })

});
