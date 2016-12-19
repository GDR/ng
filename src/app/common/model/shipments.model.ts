export class Shipment {
    constructor(
                public id: string,
                public destination: string,
                public destinationCity: string,
                public flight: string | null,
                public carrier: string | null,
                public flightDate: Date | null,
                public date: Date,
                public pieces: number,
                public weight: number,
                public volume: number,
                public fsu: string,
                public fsuLevel: string,
                public natureOfGoods: string,
                public status: string,
                public blankPrefix: string | null,
                public blankNumber: string | null,
    ) {}
}