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
  return axios('/auth/instagram')
        .then(function(res) {
          console.log('helper', res);
        });
}
