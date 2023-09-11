import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import { AiFillTrophy } from "react-icons/ai"

import moment from "moment";

import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import Avatar from "../../components/Avatar/Avatar";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import "./UsersProfile.css";
import { getLoginInfo } from "../../api";

const UserProfile = ({ slideIn, handleSlideIn }) => {
  const { id } = useParams();
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user._id === id)[0];
  const [loginHistory, setLoginHistory] = useState(null);
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [Switch, setSwitch] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem('Profile'))?.result
  const award = currentProfile && {
    silver: currentProfile?.points >= 30,
    gold: currentProfile?.points >= 60,
    diamond: currentProfile?.points >= 100
  }

  useEffect(() => {
    if (loggedInUser) {
      if (loggedInUser._id === id) {
        getLoginInfo(id).then(loginHistory => setLoginHistory(loginHistory.data.loginInfo)).catch(err => console.error(err));
      }
    }
    // eslint-disable-next-line
  }, [id])
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              <Avatar
                backgroundColor="purple"
                color="white"
                fontSize="50px"
                px="40px"
                py="20px"
                borderRadius={'10px'}
              >
                {currentProfile?.name.charAt(0).toUpperCase()}
              </Avatar>
              <div className="user-name">
                <h1>{currentProfile?.name}</h1>
                <p>points {currentProfile && currentProfile.points}</p>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                  {moment(currentProfile?.joinedOn).fromNow()}
                </p>
              </div>
            </div>

            {currentUser?.result._id === id && (
              <button
                type="button"
                onClick={() => setSwitch(true)}
                className="edit-profile-btn"
              >
                <FontAwesomeIcon icon={faPen} /> Edit Profile
              </button>
            )}

          </div>
          <>
            {Switch ? (
              <EditProfileForm
                currentUser={currentUser}
                setSwitch={setSwitch}
              />
            ) : (
              <ProfileBio currentProfile={currentProfile} />
            )}
          </>
          {
            currentProfile && <div className="badge-container-wrap">
              <h1>Badges</h1>
              <div className="badge-container">
                <div className="badge-card">
                  <div className="image-container">
                    <p className="">{award.silver ? 1 : 0}</p>
                    <AiFillTrophy style={{ fontSize: '70px', color: "silver" }} />
                  </div>
                  <p>{award.silver ? '1 silver badge': 'Earn 30 points to get Silver badge'}</p>
                </div>
                <div className="badge-card">
                  <div className="image-container">
                    <p className="">{award.gold ? 1 : 0}</p>
                    <AiFillTrophy style={{ fontSize: '70px', color: "yellow" }} />
                  </div>
                  <p>{award.gold ? '1 gold badge' : 'Earn 60 points to get Gold badge'}</p>
                </div>
                <div className="badge-card">
                  <div className="image-container">
                    <p className="">{award.diamond ? 1 : 0}</p>
                    <AiFillTrophy style={{ fontSize: '70px', color: "cyan" }} />
                  </div>
                  <p>{award.diamond ? '1 diamond badge' : 'Earn 100 points to get Diamond badge'}</p>
                </div>
              </div>
              <div>
                <h4>How to earn points</h4>
                <ul>
                  <li>Get 15 points on every  4 answer like 4,8,12,16 </li>
                  <li>delete answer don't minus points.</li>
                  <li>If any user upvote your question you get 10 points </li>
                </ul>
              </div>
            </div>
          }
          {
            loggedInUser && loggedInUser._id === id && <div  >
              {loginHistory && <h2 >Login History</h2>}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", height: "320px", overflow: "auto", padding: "10px 0" }}>
                {
                  loginHistory && loginHistory.map(history => {
                    return <div style={{ backgroundColor: "orange", boxShadow: "2px 2px 5px  gray", padding: '3px', width: 'fit-content', height: "fit-content", borderRadius: "6px", color: "#020617" }} key={history.loginAt}>
                      <p style={{ backgroundColor: "black", padding: "5px ", color: "white" }}>Date : {new Date(history.loginAt).toLocaleDateString()} {new Date(history.loginAt).toLocaleTimeString()}</p>
                      <p style={{ backgroundColor: "black", padding: "5px ", color: "white" }}>Device Type : {history.deviceType}</p>
                      <p style={{ backgroundColor: "black", padding: "5px ", color: "white" }}>Oprating System: {history.os}</p>
                      <p style={{ backgroundColor: "black", padding: "5px ", color: "white" }}>Browser : {history.browser}</p>
                      <p style={{ backgroundColor: "black", padding: "5px ", color: "white" }}>IP Address : {history.ip}</p>
                    </div>
                  })
                }
              </div>
            </div>
          }
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
