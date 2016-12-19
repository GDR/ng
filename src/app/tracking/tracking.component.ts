import {Component, OnInit} from "@angular/core";
import {TrackingService} from "./tracking.service";
import {TrackDetails} from "../common/model/track-details.model";
import {NotificationsService} from "angular2-notifications/src/notifications.service";
import {CoolLocalStorage} from "angular2-cool-storage";
import {ActivatedRoute, Router, Params} from "@angular/router";

@Component({
    selector: 'tracking-component',
    templateUrl: 'tracking.component.html',
    styleUrls: ['tracking.component.scss']
})
export class TrackingComponent implements OnInit {

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.trackPrefix = params['prefix'];
            this.trackNumber = params['number'];
            if (this.trackPrefix != null && this.trackNumber != null)
                this.searchTrack();
        });
    }

    constructor(private trackingService: TrackingService,
                private notify: NotificationsService,
                private route: ActivatedRoute,
                private router: Router,) {
    }

    trackPrefix = '555';
    trackNumber = '83940964';

    loading: boolean = false;

    trackDetails: TrackDetails = null;

    public searchTrack(): void {
        this.loading = true;
        if (this.trackPrefix.length != 3 || this.trackNumber.length != 8) {
            this.notify.error("Track number error", "Doens't match pattern");
        }
        this.trackingService.getTrackDetails(this.trackPrefix, this.trackNumber)
            .subscribe(
                trackDetails => {
                    this.trackDetails = trackDetails;
                    this.loading = false;
                },
                error => {
                    this.notify.error("No such track", "Cannot find tracking with this number");
                    this.loading = false;
                }
            )
    }
}