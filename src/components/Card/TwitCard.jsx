import React, { useEffect, useState } from 'react'
import css from './TwitCard.module.css'
import img from '../../assets/picture1.png'
import { Link } from 'react-router-dom'
import Logo from './GoItLogo'
const TwitCard = ({user, funcFollow}) => {
  const isFollowed = JSON.parse(localStorage.getItem('Followers')).find((follower) => follower.name === user.name) ? true : false
  /* console.log(JSON.parse(localStorage.getItem('Followers'))) */
  function handleFollow(){
    funcFollow(user.id, user.followers, user.name)
  }

  return (
    <div className={css.Card}>
        {Logo}
        <img src={img} className={css.TopImg}/>

        <div className={css.AvatarSec}>
            <div className={css.Line}></div>
            <div className={css.AvatarLine}>
                <Link to={`/user/${user.name}/${user.id}/tweets`}><img className={css.Avatar} src={user.avatar} alt="avatar"/></Link>
            </div>
        </div>

        <div className={css.Numbers}>
            <p>{user.tweets.toLocaleString("en-US")} TWEETS</p>
            <p>{user.followers.toLocaleString("en-US")} FOLLOWERS</p>
        </div>
        <button className={`${isFollowed && css.FollowBtn} ${css.Btn}`} onClick={()=>{handleFollow()}} type='button'>{isFollowed ? `Unfollow` : `Follow`} </button>
    </div>
  )
}
/*  */
export default TwitCard