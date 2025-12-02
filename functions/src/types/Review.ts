import { Restaurant } from "./Restaurant";

export class Review {
    constructor(
        public name: string,
        public restaurant: Restaurant,
        public rating: number,
        public comment: string,
        public photoURL: string,
    ) {}

    static fromObject(raw: any): Review {
        return new Review(
            raw.name,
            Restaurant.fromObject(raw.restaurant),
            raw.rating,
            raw.comment,
            raw.photoURL,
        );
    }

    serialize() {
        return {
            name: this.name,
            restaurant: this.restaurant.serialize(),
            rating: this.rating,
            comment: this.comment,
            photoURL: this.photoURL,
        }
    }
}