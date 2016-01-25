import React from 'react'

const Repos = ({repos}) => {
  return (
    <div>
      <h3> User Repos </h3>
      <ul className="list-group">
        {repos.map((repo, index) => {
          console.log(repo);
          return (
            <li className="list-group-item" key={repo.id}>
              {repo.profile_image_url && <img src={repo.profile_image_url} className="img-rounded img-responsive"/>}
              {repo.id && <h4><a href={repo.id}>{repo.id}</a></h4>}
              {repo.screen_name && <p>{repo.screen_name}</p>}
              {repo.name && <p>{repo.name}</p>}
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
