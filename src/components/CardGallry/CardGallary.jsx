import React from "react";
import TwitCard from "../Card/TwitCard";
import css from "./CardGallary.module.css"
const CardGallary = ({ users, button, load, funcFollow}) => {
  return (
    <>
      <ul className={css.CardGallary}>
        {users.map((user) => {
          return (
            <li key={user.id}>
              <TwitCard user={user} funcFollow={funcFollow}/>
            </li>
          );
        })}
      </ul>
      {button ? (
        <p>Це все!</p>
      ) : (
        <button
          onClick={() => {
            load();
          }}
        >
          Load more
        </button>
      )}
    </>
  );
};

export default CardGallary;
