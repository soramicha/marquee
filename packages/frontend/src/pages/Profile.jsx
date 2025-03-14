import { StarIcon } from "@chakra-ui/icons";
import Navbar from "./Navbar";
import ListingCard from "../components/ui/ListingCard.jsx";

// Sample reviews data (replace with your real data or API call)
const reviewsData = [
    {
        reviewerName: "John Doe",
        date: "March 1, 2025",
        rating: 5,
        comment: "Great user to do business with!",
    },
    {
        reviewerName: "Jane Smith",
        date: "March 3, 2025",
        rating: 4,
        comment: "Friendly and quick responses, recommended!",
    },
    {
        reviewerName: "Alice Brown",
        date: "March 5, 2025",
        rating: 5,
        comment: "Excellent communication and fast shipping!",
    },
    {
        reviewerName: "Bob Martin",
        date: "March 7, 2025",
        rating: 5,
        comment: "Item was exactly as described.",
    },
    {
        reviewerName: "Chris Green",
        date: "March 9, 2025",
        rating: 4,
        comment: "Overall good experience.",
    },
];

function Profile() {
    const user = {
        name: "Samantha Smith",
        email: "ssmith23@calpoly.edu",
        bio: "Hi! I am a 3rd-year business major with a strong interest in entrepreneurship and marketing. I have lots of items in my apartment that I am looking to get rid of. Feel free to dm me with any offers. Very open to negotiating!",
        listings: 3,
        pageViews: 42,
        pendings: 0,
        reviews: 0, // Not currently used for the average, but you can update if desired
    };

    // Compute the average rating from reviewsData
    const averageRating = reviewsData.length
        ? (
              reviewsData.reduce((sum, r) => sum + r.rating, 0) /
              reviewsData.length
          ).toFixed(1)
        : 0;

    // Renders a row of star icons for a given numeric rating (integer only)
    // If you want to handle half-stars, you'll need a custom icon or approach.
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <StarIcon
                    key={i}
                    color={i <= rating ? "#2E55C4" : "gray"}
                    boxSize={4}
                    style={{ marginRight: "2px" }}
                />
            );
        }
        return <div style={{ display: "flex" }}>{stars}</div>;
    };

    return (
        <div style={styles.page}>
            <Navbar />

            <div style={styles.profileContainer}>
                <div style={styles.leftColumn}>
                    {/* Profile Header */}
                    <div style={styles.profileHeader}>
                        <div style={styles.profilePic}></div>
                        <div>
                            <h2 style={styles.name}>
                                {user.name}{" "}
                                <span role="img" aria-label="edit">
                                    ✏️
                                </span>
                            </h2>
                            <p style={styles.email}>{user.email}</p>
                        </div>
                    </div>

                    {/* Bio Section */}
                    <div style={styles.bioBox}>
                        <p style={styles.bioText}>{user.bio}</p>
                    </div>

                    {/* Stats Section */}
                    <div style={styles.statsBox}>
                        <p>
                            <strong style={styles.statNumber}>
                                {user.listings}
                            </strong>{" "}
                            Listings
                        </p>
                        <p>
                            <strong style={styles.statNumber}>
                                {user.pageViews}
                            </strong>{" "}
                            Page Views
                        </p>
                        <p>
                            <strong style={styles.statNumber}>
                                {user.pendings}
                            </strong>{" "}
                            Pendings
                        </p>
                        <p>
                            <strong style={styles.statNumber}>
                                {user.reviews}
                            </strong>{" "}
                            Reviews
                        </p>
                    </div>

                    {/* Reviews Section */}
                    <div style={styles.reviewsSection}>
                        <div style={styles.reviewsHeader}>
                            <h3 style={styles.reviewsHeading}>Reviews</h3>
                            {reviewsData.length > 0 && (
                                <div style={styles.averageRatingBox}>
                                    <span style={styles.averageRating}>
                                        {averageRating} / 5
                                    </span>
                                    <div style={{ marginLeft: "8px" }}>
                                        {renderStars(Math.round(averageRating))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {reviewsData.length === 0 ? (
                            <p style={styles.noReviews}>No reviews yet.</p>
                        ) : (
                            reviewsData.map((review, idx) => (
                                <div style={styles.reviewBox} key={idx}>
                                    <div style={styles.reviewHeader}>
                                        <h4 style={styles.reviewTitle}>
                                            {review.reviewerName}
                                        </h4>
                                        <span style={styles.reviewDate}>
                                            {review.date}
                                        </span>
                                    </div>
                                    <div style={styles.reviewStars}>
                                        {renderStars(review.rating)}
                                    </div>
                                    <p style={styles.reviewText}>
                                        {review.comment}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN: My Listings */}
                <div style={styles.rightColumn}>
                    <h3 style={styles.listingsHeading}>My Listings</h3>
                    <div style={styles.listingsGrid}>
                        <ListingCard
                            id="2"
                            name="Gray Hoodie"
                            price="$25.00"
                            location="Listing Location"
                            tags={["vintage", "home"]}
                        />
                        <ListingCard
                            id="3"
                            name="Gray Hoodie"
                            price="$25.00"
                            location="Listing Location"
                            tags={["vintage", "home"]}
                        />
                        <ListingCard
                            id="4"
                            name="Gray Hoodie"
                            price="$25.00"
                            location="Listing Location"
                            tags={["vintage", "home"]}
                        />
                        <ListingCard
                            id="5"
                            name="Vintage Lamp"
                            price="$25.00"
                            location="Listing Location"
                            tags={["vintage", "home"]}
                        />
                        <ListingCard
                            id="6"
                            name="Vintage Lamp"
                            price="$25.00"
                            location="Listing Location"
                            tags={["vintage", "home"]}
                        />
                        {/* fix the info and add more cards if needed */}
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    page: {
        backgroundColor: "#F5F5F5",
        minHeight: "100vh",
    },

    profileContainer: {
        display: "grid",
        gridTemplateColumns: "450px 1fr",
        columnGap: "35px",
        width: "100%",
        fontFamily: "Inter, sans-serif",
        paddingTop: "150px",
        paddingLeft: "40px",
        paddingRight: "40px",
    },

    leftColumn: {},

    rightColumn: {},

    profileHeader: {
        display: "flex",
        alignItems: "center",
        marginBottom: "15px",
    },
    profilePic: {
        width: "65px",
        height: "65px",
        backgroundColor: "#C4C4C4",
        borderRadius: "50%",
        marginRight: "10px",
    },
    name: {
        margin: 0,
        fontSize: "20px",
        fontWeight: 700,
        color: "#000",
    },
    email: {
        margin: 0,
        color: "#666",
        fontSize: "14px",
    },

    bioBox: {
        backgroundColor: "#E5E5E5",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "15px",
    },
    bioText: {
        fontSize: "14px",
        color: "#000",
        margin: 0,
    },

    statsBox: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "10px",
        textAlign: "center",
        backgroundColor: "#E5E5E5",
        padding: "12px",
        borderRadius: "8px",
        color: "#000",
    },
    statNumber: {
        fontWeight: 700,
        fontSize: "16px",
    },

    // Reviews
    reviewsSection: {
        backgroundColor: "#E5E5E5",
        padding: "12px",
        borderRadius: "8px",
        marginTop: "15px",
    },
    reviewsHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "10px",
    },
    reviewsHeading: {
        margin: 0,
        fontSize: "16px",
        fontWeight: 600,
        color: "#2E55C4",
    },
    averageRatingBox: {
        display: "flex",
        alignItems: "center",
    },
    averageRating: {
        fontWeight: 600,
        fontSize: "14px",
        color: "#000",
    },
    noReviews: {
        fontSize: "14px",
        color: "#666",
        margin: 0,
    },
    reviewBox: {
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: "10px",
        marginBottom: "10px",
    },
    reviewHeader: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "5px",
    },
    reviewTitle: {
        margin: 0,
        fontWeight: 600,
        fontSize: "14px",
        color: "#000",
    },
    reviewDate: {
        margin: 0,
        fontSize: "12px",
        color: "#666",
    },
    reviewStars: {
        marginBottom: "5px",
    },
    reviewText: {
        margin: 0,
        fontSize: "14px",
        color: "#000",
    },

    listingsHeading: {
        margin: 0,
        marginBottom: "15px",
        fontSize: "18px",
        fontWeight: 600,
    },

    listingsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
    },
};

export default Profile;
