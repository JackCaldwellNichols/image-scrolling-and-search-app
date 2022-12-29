import React from 'react'

const Photo = ({
    urls: {regular},
    alt_description,
    likes,
    user: {name, portfolio_url, profile_image: {medium}}
}) => {
  return (
    <div>
        <article className='photo'>
            <img src={regular} alt= {alt_description} />
            <div className='photo-info'>
                <div>
                    <h4>{name}</h4>
                    <p>{likes}</p>
                    <a href={portfolio_url}>
                        <img src={medium} className='user-img' alt=''/>
                    </a>
                </div>
            </div>
        </article>
    </div>
  )
}

export default Photo