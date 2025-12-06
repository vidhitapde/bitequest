import { Review } from "./Review";

export class Restaurant {
  constructor(
    public reviews: Review[] = [],
    public avgRating: number = -1,
  ) {}

  static fromObject(raw: any): Restaurant {
    return new Restaurant(
      raw.reviews?.map((r: any) => Review.fromObject(r)) ?? [],
      raw.avgRating,
    );
  }

  serialize(): {
    reviews: ReturnType<Review["serialize"]>[];
    avgRating: number;
  } {
    return {
      reviews: this.reviews.map((r) => r.serialize()),
      avgRating: this.avgRating,
    };
  }
}
