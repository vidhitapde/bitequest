import { Profile } from "../functions/src/types/Profile";

describe("Profile Class", () => {
  test("add review adds review", () => {
    const profile = new Profile("user1");
    const review = {
      name: "name1",
      restaurant: {},
      rating: 5,
      comment: "yay",
      photoURL: "url",
    } as any;
    profile.addReview(review);
    expect(profile.reviews).toContain(review);
  });
});
