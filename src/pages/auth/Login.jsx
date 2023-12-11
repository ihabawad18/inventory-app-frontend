import React,{useState} from "react";
import Card from "../../components/Card";
import { BiLogIn } from "react-icons/bi";
import "./auth.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser, registerUser, validateEmail } from "../../services/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState(initialState);

  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!email || !password) {
      return toast.error("All fields are required");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };

    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="custom-container">
      {isLoading && <Loader />}
      <Card>
        <div className="flex justify-center">
          <BiLogIn size={35} color="#999" />
        </div>
        <h2 className="text-5xl w-full  text-orange-500 font-semibold">
          LogIn
        </h2>
        <form className="text-left" onSubmit={login}>
          <input
            type="email"
            required
            name="email"
            placeholder="Email"
            className="custom-input border-b-2 w-full border p-3 mt-5 text-2xl rounded shadow-md "
            onChange={handleInputChange}
            value={email}
          />
          <input
            type="password"
            required
            name="password"
            placeholder="Password"
            className="custom-input border-b-2 w-full border p-3 mt-5 text-2xl rounded shadow-md "
            onChange={handleInputChange}
            value={password}
          />
          <button
            type="submit"
            className="login-button bg-blue-500 w-full p-4 rounded text-white mt-5 mb-3 text-2xl shadow-md"
          >
            Login
          </button>
          <Link
            to="/forgot"
            className="custom-hover-scale text-xl font-medium text-orange-700 "
          >
            Forgot Password
          </Link>
          <div className="mt-5 flex justify-around">
            <Link
              to="/"
              className="custom-hover-scale text-xl font-medium text-orange-700"
            >
              Home
            </Link>
            <div>
              <span className="ml-3 text-lg text-gray-600 font-medium">
                Dont have an account?
              </span>
                <Link
                  to="/register"
                  className="custom-hover-scale ml-2 text-xl font-medium text-orange-700"
                >
                  Register
                </Link>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
