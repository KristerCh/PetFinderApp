import { Species } from "./species.enum";

export class Pet{
    idPet?: number;
    namePet: string;
    specie: Species;
    race?: string;
    age?: number;
    size?: string;
    description?: string;
    photo?: string;
}