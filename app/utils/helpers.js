import axios from 'axios'

export function getTweets(username){
  return axios('/tweets/'+username)
    .then(function(res) {
      return res.data;
    })
    .catch((err) => {console.log('getTweets', err)})
}

export function getUserInfo(username){
  return axios('/user/'+username)
    .then(function(res) {
      return res.data[0];
    })
    .catch((err) => {console.log('getUser', err)});
}
