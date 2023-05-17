import { LatLng } from "leaflet";
import type { Donation } from "./donation-types";
import type { MarkerLayer, MarkerSpec } from "./markers";

export function getMarkerLayer(donations: Donation[]): MarkerLayer {
    const markerSpecs = Array<MarkerSpec>();
    donations.forEach((donation) => {
        markerSpecs.push({
            id: donation._id,
            title: `${donation.candidate.firstName} ${donation.candidate.lastName}: €${donation.amount}`,
            location: new LatLng(donation.lat, donation.lng),
            popup: true
        });
    });
    return { title: "donations", markerSpecs: markerSpecs };
}
