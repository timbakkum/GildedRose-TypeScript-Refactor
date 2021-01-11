import { Item } from "./item";

// @FIXME ideally we want to update Item to be an abstract class
// so we don't have to typecast later on
// but unfortunately the specification/Goblin does not allow us
export class UpdateableItem extends Item {
  protected minQuality = 0;
  protected maxQuality = 50;
  protected sellInLimit = 0; // @FIXME think of better naming?
  protected defaultDeprecationRate = 1;

  handleUpdate(): Item {
    return this;
  }

  protected decreaseSellIn() {
    this.sellIn = this.sellIn - 1;
  }
}
