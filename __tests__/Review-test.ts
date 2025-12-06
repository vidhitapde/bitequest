import { Restaurant } from "../functions/src/types/Restaurant";
import { Review } from "../functions/src/types/Review";

describe("Review Class", () => {
  test("create a review with all required params", () => {
    const restaurant = new Restaurant();
    const reviewData = {
      name: "user1",
      rating: 5,
      comment: "yum",
      photoURL: "https://example.com/photo.jpg",
    };

    const review = new Review(
      reviewData.name,
      restaurant,
      reviewData.rating,
      reviewData.comment,
      reviewData.photoURL,
    );

    expect(review.name).toBe(reviewData.name);
    expect(review.restaurant).toBe(restaurant);
    expect(review.rating).toBe(reviewData.rating);
    expect(review.comment).toBe(reviewData.comment);
    expect(review.photoURL).toBe(reviewData.photoURL);
  });

  test("create review with different rating values", () => {
    const restaurant = new Restaurant();

    const review1 = new Review("user1", restaurant, 1, "yuck", "photo1.jpg");
    expect(review1.rating).toBe(1);

    const review2 = new Review("user2", restaurant, 5, "yum", "photo2.jpg");
    expect(review2.rating).toBe(5);

    const review3 = new Review("user3", restaurant, 3, "meh", "photo3.jpg");
    expect(review3.rating).toBe(3);
  });

  test("create review with empty comment", () => {
    const restaurant = new Restaurant();
    const review = new Review("user1", restaurant, 4, "", "photo.jpg");

    expect(review.comment).toBe("");
    expect(review.rating).toBe(4);
  });

  test("create review with empty photoURL", () => {
    const restaurant = new Restaurant();
    const review = new Review("user1", restaurant, 4, "yum", "");

    expect(review.photoURL).toBe("");
    expect(review.comment).toBe("yum");
  });

  test("fromObject creates review from raw data", () => {
    const rawData = {
      name: "user2",
      restaurant: {
        reviews: [],
        avgRating: 4.2,
      },
      rating: 5,
      comment: "yum",
      photoURL: "review.jpg",
    };

    const review = Review.fromObject(rawData);

    expect(review.name).toBe("user2");
    expect(review.restaurant).toBeInstanceOf(Restaurant);
    expect(review.restaurant.avgRating).toBe(4.2);
    expect(review.rating).toBe(5);
    expect(review.comment).toBe("yum");
    expect(review.photoURL).toBe("review.jpg");
  });

  test("fromObject handles nested restaurant data", () => {
    const rawData = {
      name: "user3",
      restaurant: {
        reviews: [
          {
            name: "prev",
            restaurant: { reviews: [], avgRating: -1 },
            rating: 3,
            comment: "meh",
            photoURL: "prev.jpg",
          },
        ],
        avgRating: 3.5,
      },
      rating: 4,
      comment: "yum",
      photoURL: "user3.jpg",
    };

    const review = Review.fromObject(rawData);

    expect(review.restaurant.reviews).toHaveLength(1);
    expect(review.restaurant.reviews[0]).toBeInstanceOf(Review);
    expect(review.restaurant.reviews[0].name).toBe("prev");
    expect(review.restaurant.avgRating).toBe(3.5);
  });

  test("serialize maintains data integrity", () => {
    const restaurant = new Restaurant([], 3.8);
    const originalReview = new Review(
      "user4",
      restaurant,
      4,
      "yum",
      "user4.jpg",
    );

    const serialized = originalReview.serialize();
    const restored = Review.fromObject(serialized);

    expect(restored.name).toBe("user4");
    expect(restored.rating).toBe(4);
    expect(restored.comment).toBe("yum");
    expect(restored.photoURL).toBe("user4.jpg");
    expect(restored.restaurant.avgRating).toBe(3.8);
  });

  test("handles special characters in strings", () => {
    const restaurant = new Restaurant();
    const review = new Review(
      "user5",
      restaurant,
      5,
      "¡Excelente! The café's naïve approach to fusion cuisine 中文测试",
      "https://example.com/photo.jpg",
    );

    const serialized = review.serialize();
    const restored = Review.fromObject(serialized);

    expect(restored.name).toBe("user5");
    expect(restored.comment).toBe(
      "¡Excelente! The café's naïve approach to fusion cuisine 中文测试",
    );
    expect(restored.photoURL).toBe("https://example.com/photo.jpg");
  });

  test("handles very long comment", () => {
    const longComment = "A".repeat(1000);
    const restaurant = new Restaurant();
    const review = new Review("user1", restaurant, 3, longComment, "photo.jpg");

    const serialized = review.serialize();
    const restored = Review.fromObject(serialized);

    expect(restored.comment).toBe(longComment);
    expect(restored.comment.length).toBe(1000);
  });

  test("fromObject handles missing properties gracefully", () => {
    const incompleteData = {
      name: "user1",
      restaurant: { reviews: [], avgRating: -1 },
      rating: 4,
      // missing comment and photoURL
    };

    const review = Review.fromObject(incompleteData);

    expect(review.name).toBe("user1");
    expect(review.rating).toBe(4);
    expect(review.comment).toBeUndefined();
    expect(review.photoURL).toBeUndefined();
  });
});
