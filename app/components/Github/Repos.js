import React from 'react'

const Repos = ({repos}) => {
  return (
    <div>
      <h3> User Repos </h3>
      <ul className="list-group">
        {repos.map((repo, index) => {
          return (
            <li className="list-group-item" key={repo.id}>
              {repo.profile_picture && <img src={repo.profile_picture} className="img-rounded img-responsive"/>}
              {repo.id && <h4><a href={repo.id}>{repo.id}</a></h4>}
              {repo.username && <p>{repo.username}</p>}
              {repo.full_name && <p>{repo.full_name}</p>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

Repos.propTypes = {
  username: React.PropTypes.string.isRequired,
  repos: React.PropTypes.array.isRequired
}

export default Repos
