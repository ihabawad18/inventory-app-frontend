import React, { useEffect, useState } from "react";
import "./profile.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import Card from "../../components/Card";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ChangePassword, updateUser } from "../../services/authService";

const EditUserProfile = () => {
  const [isLoading, setisLoading] = useState(false);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const { email } = user;
  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  };

  const initialState2 = {
    oldpassword: "",
    password: "",
    password2: "",
  };

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);
  const [profile, setprofile] = useState(initialState);
  const [profileImage, setprofileImage] = useState("");
  const [formData, setFormData] = useState(initialState2);
  
  const { oldpassword, password, password2 } = formData;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setprofile({ ...profile, [name]: value });
  };

  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setprofileImage(e.target.files[0]);
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      // handle image upload
      let imageURL;

      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", "dh7jwfjcx");
        image.append("upload_preset", "x14kl26d");

        // First save image to cloudinary

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dh7jwfjcx/image/upload",
          {
            method: "post",
            body: image,
          }
        );

        const imgData = await response.json();
        imageURL = imgData.url.toString();
      }
      // Save profile

      const formData = {
        name: profile?.name,
        phone: profile?.phone,
        bio: profile?.bio,
        photo: profileImage ? imageURL : profile.photo,
      };

      const data = await updateUser(formData);

      toast.success("User updated");
      navigate("/profile");
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      toast.error(error.message);
      console.log(error);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (password2 !== password) {
      return toast.error("New passwords should match");
    }
    const formData = {
      oldPassword: oldpassword,
      password,
    };

    console.log(formData);
    const data = await ChangePassword(formData);
    toast.success(data);
    navigate("/profile");
  };

  return (
    <div>
      <div className="profile my-2">
        {isLoading && <Loader />}
        <Card cardClass={"card flex flex-col"}>
          <span className="profile-photo">
            <img src={user?.photo} className=" m-auto" alt="profile-pic" />
          </span>
          <form action="" className="profile-form" onSubmit={saveProfile}>
            <span className="profile-data text-2xl ">
              <p>
                <label>Name: </label>
                <input
                  type="text"
                  name="name"
                  value={profile?.name}
                  onChange={handleInputChange}
                />
              </p>

              <p>
                <label>Email: </label>
                <input
                  type="email"
                  name="email"
                  value={profile?.email}
                  disabled
                />
                <br />
                <code>Email cannot be changed</code>
              </p>
              <p>
                <label>Phone: </label>
                <input
                  type="text"
                  name="phone"
                  value={profile?.phone}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <label>Bio: </label>
                <textarea
                  name="bio"
                  value={profile?.bio}
                  onChange={handleInputChange}
                  cols="30"
                  rows="10"
                ></textarea>
              </p>
              <p>
                <label>Photo: </label>
                <input type="file" name="image" onChange={handleImageChange} />
              </p>
            </span>
            <button className="custom-profile-button bg-blue-500 text-white rounded p-3 cursor-pointer hover:transform hover:-translate-y-1 transition-transform duration-300 ease-in-out">
              Save Changes
            </button>
          </form>
        </Card>
      </div>
      <h3 className="mt-10">Change Password</h3>
      <form onSubmit={changePassword} className="confirm-form mt-7">
        <Card cardClass={"card4"}>
          <input
            type="password"
            required
            name="oldpassword"
            placeholder="Old Password"
            className="custom-input border-b-2 w-full border p-3 mt-5 text-2xl rounded shadow-md "
            onChange={handleInputChange2}
            value={oldpassword}
          />
          <input
            type="password"
            required
            name="password"
            placeholder="New Password"
            className="custom-input border-b-2 w-full border p-3 mt-5 text-2xl rounded shadow-md "
            onChange={handleInputChange2}
            value={password}
          />
          <input
            type="password"
            required
            name="password2"
            placeholder="Confirm New Password"
            className="custom-input border-b-2 w-full border p-3 mt-5 text-2xl rounded shadow-md "
            onChange={handleInputChange2}
            value={password2}
          />
          <button
            type="submit"
            className=" bg-blue-500 text-white rounded mt-5 p-3 text-2xl cursor-pointer hover:transform hover:-translate-y-1 transition-transform duration-300 ease-in-out"
          >
            Change Password
          </button>
        </Card>
      </form>
    </div>
  );
};

export default EditUserProfile;
