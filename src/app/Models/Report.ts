import { Entity } from './Entity';
import { Pets } from './Pets';

export class Report{
    case?: number;
    petLost: number;
    Pets: Pets;
    reportBy: number;
    Entity: Entity;
    recueDate: Date;
}