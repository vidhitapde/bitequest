import { Restaurant } from "../functions/src/types/Restaurant";
import { Review } from "../functions/src/types/Review";

describe("Restaurant type", () => {
  test("create restaurant with reviews and avg rating", () => {
    const raw = {
      reviews: [
        {
          name: "Alice",
          restaurant: { reviews: [], avgRating: 3 },
          rating: 5,
          comment: "Great!",
          photoURL: "http://example.com/photo.jpg",
        },
      ],
      avgRating: 4,
    };

    const r = Restaurant.fromObject(raw);

    expect(r).toBeInstanceOf(Restaurant);
    expect(r.avgRating).toBe(4);
    expect(Array.isArray(r.reviews)).toBe(true);
    expect(r.reviews).toHaveLength(1);

    // test review of restaurant
    const rev = r.reviews[0];
    expect(rev).toBeInstanceOf(Review);
    expect(rev.name).toBe("Alice");
    expect(rev.rating).toBe(5);
    expect(rev.comment).toBe("Great!");
    expect(rev.photoURL).toBe("http://example.com/photo.jpg");

    // check restaurant object in review
    expect(rev.restaurant).toBeInstanceOf(Restaurant);
    expect(rev.restaurant.avgRating).toBe(3);
  });

  test("serialize returns correct structure in database", () => {
    const raw = {
      reviews: [
        {
          name: "Bob",
          restaurant: { reviews: [], avgRating: 2 },
          rating: 4,
          comment: "Tasty",
          photoURL: "http://example.com/bob.jpg",
        },
      ],
      avgRating: 3,
    };

    const r = Restaurant.fromObject(raw);
    const serialized = r.serialize();

    expect(serialized).toEqual({
      avgRating: 3,
      reviews: [
        {
          name: "Bob",
          restaurant: {
            reviews: [],
            avgRating: 2,
          },
          rating: 4,
          comment: "Tasty",
          photoURL: "http://example.com/bob.jpg",
        },
      ],
    });
  });

  test("reviews is initialized as empty array", () => {
    const raw = { avgRating: 1 };
    const r = Restaurant.fromObject(raw as any);
    expect(Array.isArray(r.reviews)).toBe(true);
    expect(r.reviews).toHaveLength(0);
    expect(r.avgRating).toBe(raw.avgRating);
  });
});
