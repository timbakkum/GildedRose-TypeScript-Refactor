import { Item } from "./item";

// @FIXME ideally we want to update item to be an abstract class
// so we don't have to typecast later on
export abstract class UpdateableItem extends Item {
  protected minQuality = 0;
  protected maxQuality = 50;
  protected sellInLimit = 0; // @FIXME think of better naming?
  protected defaultDeprecationRate = 1;

  abstract handleUpdate(): void;
}
