import axios from 'axios'

const tokenRequest = async() => {

    let myData = {
        grant_type: 'client_credentials',
        client_id: 'hidnUXmNDjkTuq1kDEs24QHNZdxwm2fk',
        client_secret: 'fYdhr6_gb1leHmCM7K9JwUBeXfQpPWlwWvQrNboLsesrdKUaf3oAqWHhNylVQX9w',
        audience: 'https://lipa-live/api'
      }

    let options = {
        method: 'POST',
        url: 'https://dev--ckcw8iz.us.auth0.com/oauth/token',
        headers: {'content-type': 'application/json'},
        data: JSON.stringify(myData)
      };
    const myToken = await axios.request(options)

    // console.log(myToken.data.access_token)
    return(myToken.data.access_token)
}



export default tokenRequest;