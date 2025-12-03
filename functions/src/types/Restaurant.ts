import { Location } from "./Location";
import { Review } from "./Review";

export class Restaurant {
  constructor(
    public reviews: Review[] = [],
    public location: Location,
    public avgRating: number = -1,
  ) {}

  static fromObject(raw: any): Restaurant {
    return new Restaurant(
      raw.reviews?.map((r: any) => Review.fromObject(r)) ?? [],
      Location.fromObject(raw.location),
      raw.avgRating,
    );
  }

  serialize(): {
    reviews: ReturnType<Review["serialize"]>[];
    location: ReturnType<Location["serialize"]>;
    avgRating: number;
  } {
    return {
      reviews: this.reviews.map((r) => r.serialize()),
      location: this.location.serialize(),
      avgRating: this.avgRating,
    };
  }
}
