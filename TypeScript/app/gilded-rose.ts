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
        // eslint-disable-next-line max-len
        if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (this.items[i].quality > 0) {
            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
              // this block handles decreasing of quality of "regular" items
              this.items[i].quality = this.items[i].quality - 1;
            }
          }
        } else if (this.items[i].quality < 50) {
          // this block handles increasing of quality
          // of "brie" and "backstage passes"
          this.items[i].quality = this.items[i].quality + 1;
          // eslint-disable-next-line max-len
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            // this block handles "backstage passes" items
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
        if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
          // this block handles decreasing of sellIn of all items
          // except legendary (decrease n.a.)
          this.items[i].sellIn = this.items[i].sellIn - 1;
        }
        if (this.items[i].sellIn < 0) {
          if (this.items[i].name != 'Aged Brie') {
            // eslint-disable-next-line max-len
            if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
              if (this.items[i].quality > 0) {
                if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                  // this block handles decreasing of quality
                  // of normal items when sellIn hasn't dropped below 0

                  this.items[i].quality = this.items[i].quality - 1;
                }
              }
            } else {
              // this block handles sets "backstage passes" quality to 0
              // after the concert has happened
              // eslint-disable-next-line max-len
              this.items[i].quality = this.items[i].quality - this.items[i].quality;
            }
          } else if (this.items[i].quality < 50) {
            // this block handles the increasing of "brie"
            // even when it's past it sell by date
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }

      return this.items;
    }
}
