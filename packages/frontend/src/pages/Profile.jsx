// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // ADDED: Import useAuth to access auth state.
import Navbar from "./Navbar";
import ListingCard from "../components/ui/ListingCard.jsx";
import { axiosPrivate } from "@/api/axios";

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

function Profile() {
  // Get auth state (access token and user details) from AuthContext.
  const { auth } = useAuth();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchListings() {
      // Only fetch listings if a user is logged in.
      if (auth?.user?.id) {
        try {
          const response = await axiosPrivate.get(`/api/listings/user`, {
            headers: {
              Authorization: `Bearer ${auth.access_token}`,
            },
            params: {
              userId: `${auth.user.id}`,
            }
          });
          setListings(response.data.data);
        } catch (error) {
          console.error(error);
        }   
      }
    }
    fetchListings();
  }, []);

  // If no user is logged in, prompt the user to log in.
  if (!auth?.user) {
    return <p>Please log in to see your listings.</p>;
  }

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.profileContainer}>
        <div style={styles.leftColumn}>
          <div style={styles.profileHeader}>
            <div style={styles.profilePic}></div>
            <div>
              <h2 style={styles.name}>
                {auth.user.username}{" "}
                <span role="img" aria-label="edit">
                  ✏️
                </span>
              </h2>
              <p style={styles.email}>{auth.user.username}</p>
            </div>
          </div>
          <div style={styles.bioBox}>
            <p style={styles.bioText}>Your bio goes here.</p>
          </div>
          <div style={styles.statsBox}>
            <p>
              <strong style={styles.statNumber}>0</strong> Listings
            </p>
            <p>
              <strong style={styles.statNumber}>0</strong> Page Views
            </p>
            <p>
              <strong style={styles.statNumber}>0</strong> Pendings
            </p>
            <p>
              <strong style={styles.statNumber}>0</strong> Reviews
            </p>
          </div>
        </div>
        <div style={styles.rightColumn}>
          <h3 style={styles.listingsHeading}>My Listings</h3>
          <div style={styles.listingsGrid}>
            {listings.length > 0 ? (
              listings.map((listing) => (
                <ListingCard
                  key={listing._id}
                  id={listing._id}
                  name={listing.name}
                  price={`$${listing.price.toFixed(2)}`}
                  location={listing.location}
                  tags={listing.tags}
                  imageSrc={
                    listing.photos && listing.photos.length > 0
                      ? listing.photos[0]
                      : undefined
                  }
                />
              ))
            ) : (
              <p>No listings found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
