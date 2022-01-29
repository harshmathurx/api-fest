import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import api from "../api";

export const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const responseGoogleFailure = async (response) => {
    console.log(response);
  };

  const responseGoogleSuccess = async (response) => {
    console.log(response);
    try {
      const result = await api.get("/subs", {
        headers: {
          Authorization: response.accessToken,
        },
      });
      navigate("/home", { state: result.data });
      console.log(result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_CLIENT_ID}
      buttonText="Login"
      onSuccess={responseGoogleSuccess}
      onFailure={responseGoogleFailure}
      cookiePolicy={"single_host_origin"}
      scope="https://www.googleapis.com/auth/youtube.readonly"
      responseType="token"
    />
  );
};
