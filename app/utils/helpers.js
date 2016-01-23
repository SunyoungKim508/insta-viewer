import axios from 'axios'

// function getRepos(username){
//   return axios.get(`https://api.github.com/users/${username}/repos`);
// }

function getUserInfo(username){
  return axios.get(`https://api.github.com/users/${username}`);
}

// https://api.instagram.com/v1/users/stella_58


function getRepos(username){
  let url = `https://api.instagram.com/v1/users/${username}/?access_token=506650360.cc4b050.0584728c2fcc4bd2a99b09884786db4a&scope=public_content`;
  let config = {
    url,
    method: 'get',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
    }
  };
  return axios(config);
}

export default function getGithubInfo(username){
  console.log('Insta', getRepos(username));
  return axios.all([getRepos(username), getUserInfo(username)])
    .then((arr) => ({repos: arr[0].data,bio: arr[1].data}))
}
