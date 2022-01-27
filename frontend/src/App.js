import GoogleLogin from "react-google-login";

import "./App.css";
import CREDENTIALS from "./client_secret.json";
import api from "./api";

function App() {
  const responseGoogle = async (response) => {
    console.log(response);
    try {
      const result = await api.post("/googleLogin", {
        tokenId: response.tokenId,
      });
      console.log(result);
    } catch (error) {
      console.log("Error occurred");
    }
  };

  const responseGoogleSuccess = async (response) => {
    console.log(response);
    try {
      const result = await api.get("/subs", {
        headers: {
          Authorization: response.accessToken,
        },
      });
      var subscriptions = [];
      result.data.forEach((item) => {
        var sub = {};
        sub.totalVideos = item.contentDetails.totalItemCount;
        sub.id = item.snippet.resourceId.channelId;
        sub.name = item.snippet.title;
        sub.description = item.snippet.description;
        sub.published = item.snippet.publishedAt;
        sub.picture = item.snippet.thumbnails.default.url;
        subscriptions.push(sub);
      });
      console.log(subscriptions);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <GoogleLogin
          clientId={CREDENTIALS.web.client_id}
          buttonText="Login"
          onSuccess={responseGoogleSuccess}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          scope="https://www.googleapis.com/auth/youtube.readonly"
          responseType="token"
        />
      </header>
    </div>
  );
}

export default App;
