import { Entity } from './Entity';
import { Pet } from './Pet';

export class Report{
    id?: number;
    idPet: number;
    Pet: Pet;
    idEntity: number;
    entity?: Entity;
    status: string;
    rescueDate: Date;
}