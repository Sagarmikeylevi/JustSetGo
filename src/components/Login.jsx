import { useState } from "react";
import { Link, Form, useNavigation, useNavigate } from "react-router-dom";
import Error from "./UI/Error";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../store/user-slice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();

    // console.log("Clicked");

    const loginData = {
      email,
      password,
    };

    const SendLoginData = async (data) => {
      try {
        const response = await axios.post(
          "https://jetsetgoapi123.onrender.com/api/user/login",
          data
        );

        const token = response.data.data.token;
        // console.log("TOKEN ===>", token);
        dispatch(setToken({ token }));

        navigate("/");
      } catch (error) {
        console.log("What's going on ??", error);
        setIsError({
          error: true,
          message: error.response.data.error,
        });
      }
    };

    SendLoginData(loginData);
  };

  if (isError.error) {
    return <Error message={isError.message} />;
  }

  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  const formLabelStyle = "font-semibold text-gray-600";
  const formInputStyle =
    "mt-2 pl-4 w-[18rem] h-[2.5rem] rounded border-[1px] border-gray-300 bg-transparent outline-none";
  return (
    <div className="h-auto mt-8 w-full grid place-content-center mb-8">
      <div
        className="w-[28rem] h-[32rem] rounded flex flex-col items-center justify-center pt-8 pb-4 gap-8 bg-white"
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      >
        <div className="w-[90%] grid  place-content-center gap-2">
          <div className="flex flex-row space-x-2">
            <h1 className="text-3xl font-bold tracking-wide text-gray-800 pl-8">
              Hey, hello
            </h1>
            <img
              className="w-8 h-8"
              src="https://cdn-icons-png.flaticon.com/128/5821/5821940.png"
              alt="select items"
            />
          </div>

          <p className="tracking-wider text-gray-500 text-lg">
            Enter your login credentials
          </p>
        </div>

        <Form
          onSubmit={loginHandler}
          method="POST"
          className="flex flex-col gap-2"
        >
          <div className="flex flex-col">
            <label htmlFor="email" className={formLabelStyle}>
              Email<span className="text-red-600">*</span>
            </label>
            <input
              className={`${formInputStyle} ${
                email.trim().length === 0
                  ? " border-red-400 "
                  : "border-green-400"
              }`}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className={formLabelStyle}>
              Password <span className="text-red-600">*</span>
            </label>
            <input
              className={`${formInputStyle} ${
                password.trim().length === 0
                  ? "border-red-400"
                  : "border-green-400"
              }`}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className={`w-[18rem] h-[2.5rem]  ${
              isSubmitting ? "bg-teal-400" : "bg-black"
            } text-white rounded mt-2 hover:bg-teal-400 transition duration-300 ease-in-out ${
              email.trim().length === 0 || password.trim().length === 0
                ? `pointer-events-none`
                : ""
            }`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logiing in..." : "Log in"}
          </button>
        </Form>
        <p className="text-sm tracking-wider text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-base font-semibold text-gray-900 cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
