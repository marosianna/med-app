import { Time } from "@angular/common";

export interface Appointment{
    username: string;
    date: Date;
    comment: string;
    time: {
        hour: number;
        minute: number;
    }
}