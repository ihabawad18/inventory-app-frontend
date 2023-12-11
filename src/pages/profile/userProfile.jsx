import React, { useEffect, useState } from "react";
import useRedirectLoggedOut from "../../hooks/useRedirectLoggedOut";
import { useDispatch } from "react-redux";
import { getUser } from "../../services/authService";
// import { SET_SUBMITTED } from "../../redux/features/product/productSlice";
import { SET_NAME, SET_USER } from "../../redux/features/auth/authSlice";
import { SpinnerImg } from "../../components/loader/Loader";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import "./profile.css";
const UserProfile = () => {
  useRedirectLoggedOut("/login");
  const [profile, setprofile] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setisLoading(true);
    async function getUserData() {
      const data = await getUser();

      setprofile(data);
      setisLoading(false);
      dispatch(SET_USER(data));
      dispatch(SET_NAME(data.name));
    }
    getUserData();
  }, [dispatch]);

  return (
    <div className="profile my-2 ">
      {isLoading && <SpinnerImg />}
      <>
        {!isLoading && profile === null ? (
          <p>Something went wrong please reload the page...</p>
        ) : (
          <Card cardClass={"card flex flex-col"}>
            <span className="profile-photo">
              <img src={profile?.photo} className=" m-auto" alt="profile-pic" />
            </span>
            <span className="profile-data text-2xl m-5">
              <p>
                <b>Name: </b>
                {profile?.name}
              </p>

              <p>
                <b>Email: </b>
                <span className="text-orange-600 font-bold text-2xl">
                  {profile?.email}
                </span>
              </p>
              <p>
                <b>Phone: </b>
                {profile?.phone}
              </p>
              <p>
                <b>Bio: </b>
                {profile?.bio}
              </p>
              <p></p>
              <Link to="/edit-profile">
                <button className="bg-blue-500 text-white rounded p-3 cursor-pointer hover:transform hover:-translate-y-1 transition-transform duration-300 ease-in-out">
                  Edit Profile
                </button>
              </Link>
            </span>
          </Card>
        )}
      </>
    </div>
  );
};

export default UserProfile;
