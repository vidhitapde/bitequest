import { Avatar, defaultAvatar } from "./Avatar";
import { Review } from "./Review";

export class Profile {
  constructor(
    public displayName: string,
    public avatar: Avatar = defaultAvatar,
    public reviews: Review[] = [],
  ) {}

  addReview(review: Review) {
    this.reviews.push(review);
  }

  static fromObject(raw: any): Profile {
    return new Profile(
      raw.displayName,
      raw.avatar,
      raw.reviews?.map((r: any) => Review.fromObject(r)) ?? [],
    );
  }

  serialize() {
    return {
      displayName: this.displayName,
      avatar: this.avatar,
      reviews: this.reviews.map((r) => r.serialize()),
    };
  }
}
