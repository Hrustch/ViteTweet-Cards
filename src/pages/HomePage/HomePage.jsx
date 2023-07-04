import { useEffect, useState } from "react";
import { getUsers, handleSubscribe, handleUnsubscribe } from "../../api/Api";
import CardGallary from "../../components/CardGallry/CardGallary";
import Select from "react-select";
import css from './HomePage.module.css'

function HomePage() {
  const [users, setUsers] = useState([]);
  const [isHidden, setIsHidden] = useState(false);
  const [page, setPage] = useState(1);
  const [subs, setSubs] = useState(()=>(JSON.parse(localStorage.getItem('Followers'))) || [])
  const [filter, setFilter] = useState('all')
  const options = [
    { value: "all", label: "Show all" },
    { value: "follow", label: "Follow" },
    { value: "followings", label: "Followings" },
  ];
  localStorage.setItem('Followers', JSON.stringify(subs))
  



  useEffect(() => {
    getUsers(1)
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);




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


  function handleSelector (event){
    setFilter(event.value);
  };

  function filteredUsers (){
    const store = JSON.parse(localStorage.getItem('Followers'))
    if (filter === "follow") {
      return users.filter((user) =>
      store.find((follower) => follower.name === user.name) ? false : true
      );
    }
    if (filter === "followings") {
      return users.filter((user) =>
      store.find((follower) => follower.name === user.name) ? true : false
      );
    }
    return users;
  };


  function handleFollow (id, followers, name){
    if(!subs.find((follower)=>(follower.name === name))){
      handleSubscribe(id, followers)
      .then(()=>{
        const newState = users.map((user)=>{
          if (user.id === id){
            setSubs([...subs, {name: user.name, id: user.id, sub: true}])
            localStorage.setItem('Followers', JSON.stringify(subs))
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
            localStorage.setItem('Followers', JSON.stringify(subs))
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
    <div className={css.PageBody}>
      <div style={{width: '150px', marginBottom: '24px'}}>
        <Select onChange={handleSelector} options={options} 
          styles={{control: (baseStyles) => ({...baseStyles})}}
        />
      </div>
      <CardGallary users={filteredUsers()} button={isHidden} load={loadPage} funcFollow={handleFollow}/>
    </div>
    </> 
  );
}

export default HomePage;
