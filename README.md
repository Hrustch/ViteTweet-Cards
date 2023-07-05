# ViteTweet-Cards project, created by Hrustch.

(HTML/CSS, JS, React)

Dependencies:
- axios
- react
- react-dom
- react-router-dom
- react-select

  This project uses Mokapi.io as outside data storage
    endpoints:
  .mockapi.io/users - all users
  .mockapi.io/users/(userId)/tweets - all user's tweets

    This project uses API requests to get and draw user's cards with
  their numbers of tweets and followers.
  
    We can "subscribe" on user to increase his ammount of followers by 1
  and change "follow" button state on "followed". Redraw happends ONLY on
  serwer success response, otherwise it's waiting.
  
    We send the request depending on whether the user is in our subscriptions.
  Due to leack of server abilities, to simulate subscribers database - we are using localstorage.
  If user exsists in our improvised subscriber list - we send unfollow request, if not - follow.
  
    We also can watch users posts by clicking on his avatar, we'll be send to /tweets page 
  where site forming several "post" from /users/(userId)/tweets request.
  
    I've implemented primitive filter selector wich one filters existing on page users on followed/unfollowed
  and unfortunatly due the server small functionality i'm not be able tor send furthe speciffic requests
  to get only followed or unfollowed users. 
