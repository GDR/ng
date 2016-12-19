import {HttpWrapper, NO_AUTH} from "../common/http.wrapper";
import {Inject} from "@angular/core";
import {TrackDetails} from "../common/model/track-details.model";
import {TrackingEvent} from "../common/model/track-event.model";
import {Observable} from "rxjs";

export class TrackingService {
    constructor(@Inject(NO_AUTH) private http: HttpWrapper) {}

    getTrackDetails(prefix: string, number: string): Observable<TrackDetails> {
        return this.http.get(`http://delivery.aero/tracking/json/Aerodar/${prefix}-${number}`)
            .map((trackDetails: TrackDetails) => {
                trackDetails.event.forEach((event: TrackingEvent) => {
                    event.dateTime = new Date(event.dateTime);
                    return event;
                });
                return trackDetails;
            });
    }
}