export class TrackingEvent {
    constructor(public activity: string,
                public fsu: string,
                public location: string,
                public locationCode: string,
                public flight: string,
                public dateTime: Date,
                public utcDateTime: string,
                public pieces: number,
                public weight: number,
                public volume: number,) {
    }
}