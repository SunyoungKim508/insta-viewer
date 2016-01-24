import axios from 'axios'

// function getRepos(username){
//   return axios.get(`https://api.github.com/users/${username}/repos`);
// }

function getUserInfo(username){
  return axios.get(`https://api.github.com/users/${username}`);
}

// user id
// https://api.instagram.com/v1/users/506650360

export function getRepos(username){
  return axios('/search/'+username)
        // .then((data) => {console.log('getRepos', data)};)
        .then(function(res) {
          console.log('getRepos', res.data);
          return res.data;
        })
        .catch((err) => {console.log('getRepost', err)});
}

export function getGithubInfo(username){
  console.log('here!', getRepos(username));
  return axios.all([getRepos(username), getUserInfo(username)])
    .then((arr) => ({repos: data, bio: arr[1].data}))
    .catch((err) => (console.log(err)));
}

export function login() {
  let url = '/auth/instagram';
  let config = {
    url,
    method: 'get',
    responseType: 'jsonp',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
  return axios(config);
}
