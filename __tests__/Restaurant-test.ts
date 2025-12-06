import { Restaurant } from "../functions/src/types/Restaurant";
import { Review } from "../functions/src/types/Review";

describe("Restaurant Class", () => {
    test("create a restaurant with default params", () => {
        const restaurant = new Restaurant();

        expect(restaurant.reviews).toEqual([]);
        expect(restaurant.avgRating).toBe(-1);
    });

    test("create a restaurant with custom params", () => {
        const mockReviews = [
            new Review("John", new Restaurant(), 5, "Great food!", "photo1.jpg"),
            new Review("Jane", new Restaurant(), 4, "Good service", "photo2.jpg")
        ];
        const avgRating = 4.5;

        const restaurant = new Restaurant(mockReviews, avgRating);

        expect(restaurant.reviews).toEqual(mockReviews);
        expect(restaurant.avgRating).toBe(avgRating);
    });

    test("fromObject creates restaurant from raw data", () => {
        const rawData = {
            reviews: [
                {
                    name: "Alice",
                    restaurant: { reviews: [], avgRating: -1 },
                    rating: 5,
                    comment: "Excellent!",
                    photoURL: "alice.jpg"
                },
                {
                    name: "Bob",
                    restaurant: { reviews: [], avgRating: -1 },
                    rating: 3,
                    comment: "Average",
                    photoURL: "bob.jpg"
                }
            ],
            avgRating: 4.0
        };

        const restaurant = Restaurant.fromObject(rawData);

        expect(restaurant.reviews).toHaveLength(2);
        expect(restaurant.reviews[0]).toBeInstanceOf(Review);
        expect(restaurant.reviews[0].name).toBe("Alice");
        expect(restaurant.reviews[1].name).toBe("Bob");
        expect(restaurant.avgRating).toBe(4.0);
    });

    test("fromObject handles missing reviews array", () => {
        const rawData = {
            avgRating: 3.5
        };

        const restaurant = Restaurant.fromObject(rawData);

        expect(restaurant.reviews).toEqual([]);
        expect(restaurant.avgRating).toBe(3.5);
    });

    test("serialize returns correct format", () => {
        const mockReviews = [
            new Review("John", new Restaurant(), 5, "Great!", "john.jpg"),
            new Review("Jane", new Restaurant(), 4, "Good", "jane.jpg")
        ];
        const restaurant = new Restaurant(mockReviews, 4.5);

        const serialized = restaurant.serialize();

        expect(serialized).toHaveProperty("reviews");
        expect(serialized).toHaveProperty("avgRating");
        expect(serialized.reviews).toHaveLength(2);
        expect(serialized.avgRating).toBe(4.5);
        expect(serialized.reviews[0]).toHaveProperty("name");
        expect(serialized.reviews[0]).toHaveProperty("restaurant");
        expect(serialized.reviews[0]).toHaveProperty("rating");
        expect(serialized.reviews[0]).toHaveProperty("comment");
        expect(serialized.reviews[0]).toHaveProperty("photoURL");
    });

   

    
});
