import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DeleteTop5Redux } from "../redux/top5Sclice";

const Top5Card = () => {
  const top5s = useSelector((state) => state.top5.top5s);
  const dispatch = useDispatch();

  /* onst rauw = {
    id: "1mcTU81TzQhprhouKaTkpq",
    name: "Rauw Alejandro",
    url: "https://i.scdn.co/image/ab6761610000e5eb320d115629a65c245a43b00f",
    top5: [
      { id: "6Xu7owZWwBVbhxOVA45hMK", name: "CAZADORES" },
      { id: "4uVEdikP5eLUy8Dq6gjiPV", name: "PANTIES Y BRASIERES" },
      { id: "6glF8OLZEE2AHVu5YtOoiu", name: "GATAS" },
      { id: "6glF8OLZEE2AHVu5YtOoiu", name: "GATAS" },
      { id: "58EM1w815O5XZGWSF7DUCf", name: "LEJOS DEL CIELO" },
    ],
  }; */
  //const fakeTop5 = [rauw, rauw, rauw, rauw, rauw, rauw, rauw];
  console.log(top5s);
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

            <Link to={"/Edit/" + top.id}>Edit</Link>
            <button onClick={() => dispatch(DeleteTop5Redux(top.id))}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Top5Card;
