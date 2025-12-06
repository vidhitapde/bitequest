import { Restaurant } from "../functions/src/types/Restaurant";
import { Review } from "../functions/src/types/Review";

describe("Review Class", () => {
    test("create a review with all required params", () => {
        const restaurant = new Restaurant();
        const reviewData = {
            name: "John Doe",
            rating: 5,
            comment: "Excellent food and service!",
            photoURL: "https://example.com/photo.jpg"
        };

        const review = new Review(
            reviewData.name,
            restaurant,
            reviewData.rating,
            reviewData.comment,
            reviewData.photoURL
        );

        expect(review.name).toBe(reviewData.name);
        expect(review.restaurant).toBe(restaurant);
        expect(review.rating).toBe(reviewData.rating);
        expect(review.comment).toBe(reviewData.comment);
        expect(review.photoURL).toBe(reviewData.photoURL);
    });

    test("create review with different rating values", () => {
        const restaurant = new Restaurant();
        
        const review1 = new Review("User1", restaurant, 1, "Poor", "photo1.jpg");
        expect(review1.rating).toBe(1);

        const review2 = new Review("User2", restaurant, 5, "Excellent", "photo2.jpg");
        expect(review2.rating).toBe(5);

        const review3 = new Review("User3", restaurant, 3, "Average", "photo3.jpg");
        expect(review3.rating).toBe(3);
    });

    test("create review with empty comment", () => {
        const restaurant = new Restaurant();
        const review = new Review("User", restaurant, 4, "", "photo.jpg");

        expect(review.comment).toBe("");
        expect(review.rating).toBe(4);
    });

    test("create review with empty photoURL", () => {
        const restaurant = new Restaurant();
        const review = new Review("User", restaurant, 4, "Good food", "");

        expect(review.photoURL).toBe("");
        expect(review.comment).toBe("Good food");
    });

    test("fromObject creates review from raw data", () => {
        const rawData = {
            name: "Alice Smith",
            restaurant: {
                reviews: [],
                avgRating: 4.2
            },
            rating: 5,
            comment: "Amazing experience!",
            photoURL: "alice_review.jpg"
        };

        const review = Review.fromObject(rawData);

        expect(review.name).toBe("Alice Smith");
        expect(review.restaurant).toBeInstanceOf(Restaurant);
        expect(review.restaurant.avgRating).toBe(4.2);
        expect(review.rating).toBe(5);
        expect(review.comment).toBe("Amazing experience!");
        expect(review.photoURL).toBe("alice_review.jpg");
    });

    test("fromObject handles nested restaurant data", () => {
        const rawData = {
            name: "Bob Johnson",
            restaurant: {
                reviews: [
                    {
                        name: "Previous User",
                        restaurant: { reviews: [], avgRating: -1 },
                        rating: 3,
                        comment: "Okay",
                        photoURL: "prev.jpg"
                    }
                ],
                avgRating: 3.5
            },
            rating: 4,
            comment: "Better than expected",
            photoURL: "bob.jpg"
        };

        const review = Review.fromObject(rawData);

        expect(review.restaurant.reviews).toHaveLength(1);
        expect(review.restaurant.reviews[0]).toBeInstanceOf(Review);
        expect(review.restaurant.reviews[0].name).toBe("Previous User");
        expect(review.restaurant.avgRating).toBe(3.5);
    });

   

    test("serialize maintains data integrity", () => {
        const restaurant = new Restaurant([], 3.8);
        const originalReview = new Review("Jane Doe", restaurant, 4, "Nice atmosphere", "jane.jpg");

        const serialized = originalReview.serialize();
        const restored = Review.fromObject(serialized);

        expect(restored.name).toBe("Jane Doe");
        expect(restored.rating).toBe(4);
        expect(restored.comment).toBe("Nice atmosphere");
        expect(restored.photoURL).toBe("jane.jpg");
        expect(restored.restaurant.avgRating).toBe(3.8);
    });



    test("handles special characters in strings", () => {
        const restaurant = new Restaurant();
        const review = new Review(
            "José García-Smith",
            restaurant,
            5,
            "¡Excelente! The café's naïve approach to fusion cuisine 中文测试",
            "https://example.com/José's%20photo.jpg"
        );

        const serialized = review.serialize();
        const restored = Review.fromObject(serialized);

        expect(restored.name).toBe("José García-Smith");
        expect(restored.comment).toBe("¡Excelente! The café's naïve approach to fusion cuisine 中文测试");
        expect(restored.photoURL).toBe("https://example.com/José's%20photo.jpg");
    });

    test("handles very long comment", () => {
        const longComment = "A".repeat(1000);
        const restaurant = new Restaurant();
        const review = new Review("User", restaurant, 3, longComment, "photo.jpg");

        const serialized = review.serialize();
        const restored = Review.fromObject(serialized);

        expect(restored.comment).toBe(longComment);
        expect(restored.comment.length).toBe(1000);
    });

    test("fromObject handles missing properties gracefully", () => {
        const incompleteData = {
            name: "Incomplete User",
            restaurant: { reviews: [], avgRating: -1 },
            rating: 4
            // missing comment and photoURL
        };

        const review = Review.fromObject(incompleteData);

        expect(review.name).toBe("Incomplete User");
        expect(review.rating).toBe(4);
        expect(review.comment).toBeUndefined();
        expect(review.photoURL).toBeUndefined();
    });
});
