import { useState } from "react";
import "./GithubSearch.css";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import { PiBuildingFill } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";

function GithubSearch() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  //   feting api
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`,
      );
      console.log(response.data);
      setProfile(response.data);
      setError(null);
    } catch (error) {
      setProfile(null);
      setError(" User not found");
    }
  };
  return (
    <div className="main-container">
      <h1 className="main-heading">Github profile Detectitve</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Githube Username..."
          className="search-input"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>

      {error && <p className="error-msg">{error}</p>}

      {profile && (
        <div className="profile-container">
          <div className="profile-content">
            <div className="profile-img">
              <img src={profile.avatar_url} alt="" className="profile-avatar" />
            </div>
            <div className="profile-details">
              <div className="profile-des">
                <h2 className="">username:{profile.name}</h2>
                <p className="profile-created">
                  joined: {new Date(profile.created_at).toLocaleDateString()}
                </p>
              </div>
              <a
                href={profile.html_url}
                target="_blank"
                className="profile-username"
              >
                {profile.login}
              </a>
              <p className="profile-bio">
                Bio: <br />
                {profile?.bio || "No bio available"}
              </p>

              <div className="profile-stats">
                <p className="profile-repo">
                  Repositries <br />{" "}
                  <span className="span">{profile.public_repos}</span>
                </p>

                <p className="profile-followers">
                  Followers <br />{" "}
                  <span className="span">{profile.followers}</span>
                </p>

                <p className="profile-following">
                  Following <br />{" "}
                  <span className="span">{profile.following}</span>
                </p>
              </div>

              {/* profile info */}
              <div className="profile-info">
                <div className="profile-location">
                  <FaMapMarkerAlt />
                  {profile?.location || "No location details available"}
                </div>
                <div className="profile-company">
                  <PiBuildingFill />
                  {profile?.company ?
                    profile.company
                  : "No company details available"}
                </div>
              </div>
              {/* profile info ends*/}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GithubSearch;
