import {Component, OnInit} from "@angular/core";
import {ShipmentsService} from "./shipments.service";
import {Shipment} from "../common/model/shipments.model";
import {NotificationsService} from "angular2-notifications/src/notifications.service";

@Component({
    selector: 'shipments-component',
    templateUrl: 'shipments.component.html',
    styleUrls: ['shipments.component.scss'],
})
export class ShipmentsComponent implements OnInit {
    ngOnInit(): void {
        this.loading = true;
        this.shipmentsService.getShipments().subscribe(
            shipments => {
                this.shipments = shipments;
                this.loading = false;
            },
            () => {
                this.notify.error("Error", "Error while loading shipments");
                this.loading = false;
            }
        )
    }

    constructor(private shipmentsService: ShipmentsService,
                private notify: NotificationsService) {

    }

    shipments: Shipment[] = null;
    loading: boolean = false;
}