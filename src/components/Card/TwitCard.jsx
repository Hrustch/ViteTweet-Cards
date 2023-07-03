import React, { useEffect, useState } from 'react'
import css from './TwitCard.module.css'
import img from '../../assets/picture1.png'
import { handleSubscribe } from '../../api/Api'

const TwitCard = ({user, funcFollow}) => {
  const [isFollowed, setIsFollowed] = useState(()=>(JSON.parse(localStorage.getItem('Followers')).find((follower) => follower.name === user.name) ? true : false));
  console.log(isFollowed)
/*   useEffect(() => {
    const followers = JSON.parse(localStorage.getItem('Followers')).find((follower) => follower.name === user.name).sub;
    if(followers){
      console.log(followers)
    }
  }, []); */

  function handleFollow(){
    funcFollow(user.id, user.followers, user.name)
    if(isFollowed){
      setIsFollowed(false)
    }
    else{
      setIsFollowed(true)
    }
  }

  return (
    <div className={css.Card}>
        <img src={img} className={css.TopImg}/>

        <div className={css.AvatarSec}>
            <div className={css.Line}></div>
            <div className={css.AvatarLine}>
                <img className={css.Avatar} src={user.avatar} alt="avatar"/>
            </div>
        </div>

        <div className={css.Numbers}>
            <p>{user.tweets} TWEETS</p>
            <p>{user.followers} FOLLOWERS</p>
        </div>
        <p>{`${isFollowed}`}</p>
        <button onClick={()=>{handleFollow()}}>Follow</button>
    </div>
  )
}
/*  */
export default TwitCard