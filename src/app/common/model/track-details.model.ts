import {TrackingEvent} from "./track-event.model";

export class TrackDetails {
    constructor(public blankPrefix: string,
                public blankNumber: string,
                public destination: string,
                public destinationCity: string,
                public origin: string,
                public originCity: string,
                public pieces: number,
                public weight: number,
                public volume: number,
                public event: TrackingEvent[]) {
    }
}