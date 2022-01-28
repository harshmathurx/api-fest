import { GoogleLogin } from "react-google-login";
import CREDENTIALS from "../client_secret.json";
import api from "../api";

export const GoogleLoginButton = () => {
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
      console.log(result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <GoogleLogin
      clientId={CREDENTIALS.web.client_id}
      buttonText="Login"
      onSuccess={responseGoogleSuccess}
      onFailure={responseGoogleFailure}
      cookiePolicy={"single_host_origin"}
      scope="https://www.googleapis.com/auth/youtube.readonly"
      responseType="token"
    />
  );
};
