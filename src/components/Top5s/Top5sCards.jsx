import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteTop5Redux,
  EditTop5Redux,
  currArtistRedux,
} from "../../redux/top5Sclice";

const Top5sCards = () => {
  const top5s = useSelector((state) => state.top5.top5s);
  const dispatch = useDispatch();
  //const currArtist = useSelector((state) => state.top5.currentArtist);

  const editTop5 = (top) => {
    dispatch(EditTop5Redux(top));
    const currArtist = top.currArtist;

    dispatch(currArtistRedux({ currArtist }));
  };

  //console.log(top5s);
  return (
    <div className="top5card_container">
      {top5s.map((top) => (
        <div key={top.id}>
          <div className="top5card_con">
            <h3>{top.name}</h3>
            <img src={top.url} alt="" />
            {top.top5.map((song, i) => (
              <div key={song.songId} className="top5card_songs">
                {`${i + 1}
                ${song.name}`}
              </div>
            ))}
            <Link onClick={() => editTop5(top)} to={"/Edit/" + top.id}>
              Edit
            </Link>
            <button onClick={() => dispatch(DeleteTop5Redux(top.id))}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Top5sCards;
