import Navbar from "./Navbar";
import ListingCard from "../components/ui/ListingCard.jsx";

function Profile() {
  const user = {
    name: "Samantha Smith",
    email: "ssmith23@calpoly.edu",
    bio: "Hi! I am a 3rd-year business major with a strong interest in entrepreneurship and marketing. I have lots of items in my apartment that I am looking to get rid of. Feel free to dm me with any offers. Very open to negotiating!",
    listings: 3,
    pageViews: 42,
    pendings: 0,
    reviews: 0,
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
              <strong style={styles.statNumber}>{user.listings}</strong> Listings
            </p>
            <p>
              <strong style={styles.statNumber}>{user.pageViews}</strong> Page Views
            </p>
            <p>
              <strong style={styles.statNumber}>{user.pendings}</strong> Pendings
            </p>
            <p>
              <strong style={styles.statNumber}>{user.reviews}</strong> Reviews
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: My Listings */}
        <div style={styles.rightColumn}>
          <h3 style={styles.listingsHeading}>My Listings</h3>
          <div style={styles.listingsGrid}>
          <ListingCard
              id="2"
              name="Vintage Lamp"
              price="$25.00"
              location="Listing Location"
              tags={["vintage", "home"]}
            />
            <ListingCard
              id="2"
              name="Vintage Lamp"
              price="$25.00"
              location="Listing Location"
              tags={["vintage", "home"]}
            />
                        <ListingCard
              id="2"
              name="Vintage Lamp"
              price="$25.00"
              location="Listing Location"
              tags={["vintage", "home"]}
            />
                        <ListingCard
              id="2"
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

  leftColumn: {
  },

  rightColumn: {
  },

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
