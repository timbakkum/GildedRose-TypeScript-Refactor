import { Item } from "../item";
import { UpdateableItem } from "./../updateable-item";

export class SulfurasItem extends UpdateableItem {
  constructor(name: string, sellIn: number, quality: number) {
    super(name, sellIn, 80);
  }

  handleUpdate() {
    return this as Item;
  }
}
