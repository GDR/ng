import {WITH_AUTH, HttpWrapper} from "../common/http.wrapper";
import {Inject} from "@angular/core";
import {Shipment} from "../common/model/shipments.model";
import {Observable} from "rxjs";

export class ShipmentsService {
    constructor(@Inject(WITH_AUTH) private http: HttpWrapper) {}

    getShipments(): Observable<Shipment[]> {
        return this.http.get("https://mobile.soft.aero/delivery/api.svc/Aerodar/MyShipments")
            .map((shipments: Shipment[]) =>{
                shipments.forEach((shipment: Shipment) => {
                    shipment.date = new Date(shipment.date);
                    shipment.flightDate = new Date(shipment.flightDate);
                });
                return shipments;
            });
    }
}