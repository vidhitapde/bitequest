import { Restaurant } from "./Restaurant";

export class Location {
    constructor(
        public restaurants: Restaurant[] = [],
        public timesVisited: number = 0,
    ) {}

    static fromObject(raw: any): Location {
        return new Location(
            raw.restaurants?.map((r:any) => Restaurant.fromObject(r)) ?? [],
            raw.timesVisited,
        );
    }

    serialize(): { restaurants: any[]; timesVisited: number } {
        return {
            restaurants: this.restaurants.map(r => r.serialize()),
            timesVisited: this.timesVisited,
        };
    }
}