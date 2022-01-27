import { GoogleLogin } from 'react-google-login';
import web from "../client_secret.json";

const responseGoogle = (response) => {
  console.log(response);
}

export default <GoogleLogin
    clientId={web.client_id}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
