import { Deserialize } from "@models/deserialize.model";


export class Heroe implements Deserialize {
  public id!: number;
  public superhero!: string;
  public publisher?: string;
  public alter_ego!: string;
  public first_appearance!: string;
  public characters?: string;

  constructor() {

  }
  deserialize(input: any) {
    Object.assign(this, input);

    return this;
  }

}
