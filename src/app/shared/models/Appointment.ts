import { Time } from "@angular/common";

export interface Appointment{
    id: string;
    username?: string;
    date: number;
    comment: string;
    imageId?: string; 
    time: string;
    
}