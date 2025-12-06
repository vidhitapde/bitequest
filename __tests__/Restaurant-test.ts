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
                    name: "user1",
                    restaurant: { reviews: [], avgRating: -1 },
                    rating: 5,
                    comment: "Excellent!",
                    photoURL: "user1.jpg"
                },
                {
                    name: "user2",
                    restaurant: { reviews: [], avgRating: -1 },
                    rating: 3,
                    comment: "Average",
                    photoURL: "user2.jpg"
                }
            ],
            avgRating: 4.0
        };

        const restaurant = Restaurant.fromObject(rawData);

        expect(restaurant.reviews).toHaveLength(2);
        expect(restaurant.reviews[0]).toBeInstanceOf(Review);
        expect(restaurant.reviews[0].name).toBe("user1");
        expect(restaurant.reviews[1].name).toBe("user2");
        expect(restaurant.avgRating).toBe(4.0);
        expect(restaurant.reviews[0].restaurant).toBeInstanceOf(Restaurant);
        expect(restaurant.reviews[1].rating).toBe(5);
    });

    test("reviews is initialized as empty array and avgRating is correct", () => {
        const rawData = {
            avgRating: 3.5
        };

        const restaurant = Restaurant.fromObject(rawData);

        expect(restaurant.reviews).toEqual([]);
        expect(restaurant.avgRating).toBe(3.5);
    });

    test("serialize returns correct format", () => {
        const raw = {
        reviews: [
            {
            name: "user1",
            restaurant: { reviews: [], avgRating: 2 },
            rating: 4,
            comment: "Tasty",
            photoURL: "http://example.com/user1.jpg",
            },
        ],
        avgRating: 3,
        };

        const restaurant = Restaurant.fromObject(raw);
        const serialized = restaurant.serialize();

        expect(serialized).toEqual({
        avgRating: 3,
        reviews: [
            {
            name: "user1",
            restaurant: {
                reviews: [],
                avgRating: 2,
            },
            rating: 4,
            comment: "Tasty",
            photoURL: "http://example.com/user1.jpg",
            },
        ],
        });
    });

   

    
});
