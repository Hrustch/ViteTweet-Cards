import { useEffect, useState } from "react";
import TwitCard from "./components/Card/TwitCard";
import { getUsers, handleSubscribe, handleUnsubscribe } from "./api/Api";
import CardGallary from "./components/CardGallry/CardGallary";


function App() {
  const [users, setUsers] = useState([]);
  const [isHidden, setIsHidden] = useState(false);
  const [page, setPage] = useState(1);
  const [subs, setSubs] = useState(()=>(JSON.parse(localStorage.getItem('Followers'))) || [])

  useEffect(() => {
    getUsers(1)
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(()=>{
    localStorage.setItem('Followers', JSON.stringify(subs))
  },[subs])


  function loadPage() {
    getUsers(page + 1)
      .then((data) => {
        if (data.length < 4) {
          setIsHidden(true);
        }
        setUsers([...users, ...data]);
      })
      .catch((err) => console.log(err))
      .finally(setPage(page + 1));
  }


  function handleFollow (id, followers, name){
    if(!subs.find((follower)=>(follower.name === name))){
      handleSubscribe(id, followers)
      .then(()=>{
        const newState = users.map((user)=>{
          if (user.id === id){
            setSubs([...subs, {name: user.name, id: user.id, sub: true}])
            return {...user, followers: followers + 1}
          }
          return user;
        })      
        setUsers([...newState])  
      })
      .catch(err=>console.log(err))
    }
    else{
      handleUnsubscribe(id, followers)
      .then(()=>{
        const newState = users.map((user)=>{
          if (user.id === id){
            setSubs([...subs.filter((follower)=>(follower.name !== name))])
            return {...user, followers: followers - 1}
          }
          return user;
        })
        setUsers([...newState])
      })
    }
  }


  if (!users) {
    return;
  }
  return (
    <>
      <CardGallary users={users} button={isHidden} load={loadPage} funcFollow={handleFollow}/>
    </>
  );
}

export default App;
