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
      <div style={styles.container}>
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
            <strong style={styles.statNumber}>{user.pageViews}</strong> Page
            Views
          </p>
          <p>
            <strong style={styles.statNumber}>{user.pendings}</strong> Pendings
          </p>
          <p>
            <strong style={styles.statNumber}>{user.reviews}</strong> Reviews
          </p>
        </div>
      </div>
    </div>
  );
};

// Updated Styling to Match Figma
const styles = {
  page: {
    backgroundColor: "#F5F5F5", // Light gray background to match Figma
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    maxWidth: "400px",
    padding: "20px",
    fontFamily: "Inter, sans-serif",
  },
  profileHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "10px",
  },
  profilePic: {
    width: "65px",
    height: "65px",
    backgroundColor: "#C4C4C4", // Slightly darker placeholder
    borderRadius: "50%",
  },
  name: {
    margin: "0",
    fontSize: "20px",
    fontWeight: "700", // Make bold
    color: "#000", // Black text
    display: "flex",
    alignItems: "center",
  },
  email: {
    margin: "0",
    color: "#666",
    fontSize: "14px",
  },
  bioBox: {
    backgroundColor: "#E5E5E5",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  bioText: {
    fontSize: "14px",
    color: "#000", // Black text
  },
  statsBox: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    textAlign: "center",
    backgroundColor: "#E5E5E5",
    padding: "12px",
    borderRadius: "8px",
    color: "#000", // Black text

  },
  statNumber: {
    fontWeight: "700", // Bold for numbers
    fontSize: "16px",
    color: "#000", // Black text

  },
};

export default Profile;
