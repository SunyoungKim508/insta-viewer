import axios from 'axios'

// function getRepos(username){
//   return axios.get(`https://api.github.com/users/${username}/repos`);
// }

// function getUserInfo(username){
//   return axios.get(`https://api.github.com/users/${username}`);
// }

// user id
// https://api.instagram.com/v1/users/506650360

export function getUserInfo(username){
  console.log('going to server');
  return axios('/search/'+username)
        // .then((data) => {console.log('getUser', data)};)
        .then(function(res) {
          console.log('getUser', res.data);
          return res.data;
        })
        .catch((err) => {console.log('getUser', err)});
}

export function getGithubInfo(username){
  console.log('here!', getUser(username));
  return axios.all([getUser(username), getUserInfo(username)])
    .then((arr) => ({repos: data, bio: arr[0]}))
    .catch((err) => (console.log(err)));
}

