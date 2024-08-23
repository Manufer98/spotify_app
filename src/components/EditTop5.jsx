import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
/* import Brightness1Icon from "@mui/icons-material/Brightness1"; */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import {
  AddTop5Redux,
  MinusTop5Redux,
  changeStatus,
} from "../redux/top5Sclice";
import "./ArtistDetail.css";
import Songs from "./Songs";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import StatusSongs from "./StatusSongs";

const EditTop5 = () => {
  const [showFront, setShowFront] = useState(true);
  const ClientId = "186edb51b04148d99e7c55ed02ebc0fa";
  const ClientSecret = "24db6b43a228490f81bdada8879ec536";
  const [albums, setAlbums] = useState([]);
  const { id } = useParams();
  const [token, setToken] = useState("");
  const [artist, setArtist] = useState([]);
  const [view, setView] = useState("albums");
  const [currAlbum, setCurrAlbum] = useState({});

  const [currAlbumPoss, setCurrAlbumPoss] = useState(1);
  /* const [arrayCiruculos, setArrayCiruculos] = useState([]); */
  const top5 = useSelector((state) => state.top5.top5);
  const currArtist = useSelector((state) => state.top5.currentArtist);
  const dispatch = useDispatch();
  /* const [selected, setSelected] = "card_songs"; */

  useEffect(() => {
    // console.log(currAlbum, currAlbumPoss);
    getToken();

    setArtist(currArtist);
  }, []);

  useEffect(() => {
    searchSongs();
    //console.log("Holi");
  }, [currAlbumPoss]);

  useEffect(() => {
    search();
    searchSongs();
  }, [token]);

  const getToken = async () => {
    const authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        ClientId +
        "&client_secret=" +
        ClientSecret,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((res) => res.json())
      .then((data) => setToken(data.access_token));
  };

  const search = async () => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    const albumss = await fetch(
      "https://api.spotify.com/v1/artists/" +
        id +
        "/albums" +
        "?include_groups=album&market=US&limit=50",
      searchParameters,
    )
      .then((res) => res.json())
      .then((data) => {
        setAlbums(
          data.items.map((artist) => ({
            id: artist.id,
            name: artist.name,
            url: artist.images[0].url,
          })),
        );
        return data.items.map((artist) => ({
          id: artist.id,
          name: artist.name,
          url: artist.images[0].url,
        }));
      });

    setCurrAlbum(albumss[currAlbumPoss - 1]);
  };

  const carrouselLeft = () => {
    if (currAlbumPoss !== 1) {
      setCurrAlbumPoss(currAlbumPoss - 1);
      setCurrAlbum(albums[currAlbumPoss - 2]);
    }
    if (currAlbumPoss === 1) {
      // console.log(currAlbumPoss);
      setCurrAlbumPoss(albums.length);
      setCurrAlbum(albums[albums.length - 1]);
    }
  };

  const carrouselRight = () => {
    if (currAlbumPoss !== albums.length) {
      setCurrAlbumPoss(currAlbumPoss + 1);
      setCurrAlbum(albums[currAlbumPoss]);
    }
    if (currAlbumPoss === albums.length) {
      setCurrAlbumPoss(0);
      setCurrAlbum(albums[0]);
    }
  };

  const handlePageChange = (page) => {
    setCurrAlbumPoss(page);
    setCurrAlbum(albums[page - 1]);
  };

  const searchSongs = async () => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    if (currAlbum !== undefined && currAlbum.id != undefined) {
      const songs = await fetch(
        "https://api.spotify.com/v1/albums/" + currAlbum.id + "/tracks",
        searchParameters,
      );
      const a = await songs.json();
      currAlbum.songs = await a.items.map((song) => ({
        name: song.name,
        id: song.id,
        album: { albumName: currAlbum.name, albumId: currAlbum.id },
      }));
      setCurrAlbum(currAlbum);
      //console.log(currAlbum.songs);
    }
  };

  const handleSelected = (name) => {
    if (top5.some((i) => i.name === name)) {
      return "card_songs_selected";
    } else {
      return "card_songs";
    }
  };

  const handleAddTop5 = (song) => {
    const songi = {
      id: song.id,
      name: song.name,
    };

    dispatch(AddTop5Redux(songi));
    // navigate('/Artist/'+artist.id);
  };
  const handleMinusTop5 = (song) => {
    //console.log("asd");
    const songi = {
      id: song.id,
      name: song.name,
    };

    dispatch(MinusTop5Redux(songi));
  };

  return (
    <>
      <div className="coni">
        Edit
        <div className="albums_statuscon">
          <StatusSongs />
        </div>
        <button onClick={() => setView("albums")}>Albums</button>
        <button onClick={() => setView("songs")}>Songs</button>
        <button>
          {" "}
          <Link
            onClick={() => top5.length === 5 && dispatch(changeStatus(2))}
            className="link"
            to={top5.length === 5 ? "/OrderSongs" : ""}
          >
            Next
          </Link>{" "}
        </button>
      </div>

      {view === "albums" ? (
        <>
          <h3>{currAlbum.name}</h3>
          <div className="albums_container">
            <div className="albums_subcontainer">
              <div className="flippable_container">
                <CSSTransition in={showFront} timeout={300} classNames="flip">
                  <div className="card_container">
                    <div className="card_front">
                      <div className="albums_subcontainer">
                        <div className="albums_carrousel">
                          <div
                            className="albums_carrouselInner"
                            style={{ backgroundImage: `url(${currAlbum.url})` }}
                          >
                            <div className="left" onClick={carrouselLeft}>
                              <ArrowBackIosIcon onClick={carrouselLeft} />
                            </div>
                            <div className="center"></div>
                            <div className="right" onClick={carrouselRight}>
                              <ArrowForwardIosIcon onClick={carrouselRight} />
                            </div>
                          </div>
                        </div>

                        <ResponsivePagination
                          current={currAlbumPoss}
                          total={albums.length}
                          onPageChange={(page) => handlePageChange(page)}
                        />

                        <button
                          onClick={() => {
                            setShowFront((v) => !v);
                            /*  const formula = currAlbum.songs.length * 80 + "px";
                          const root = document.documentElement;
                          root?.style.setProperty(
                            "--margin-songs",
                            currAlbum.songs ? formula : "0px",
                          ); */
                          }}
                        >
                          View Songs
                        </button>
                      </div>
                    </div>

                    <div className="card_back">
                      <div className="card_back_container">
                        <div className="card_back_title">
                          <h5>Songs {currAlbum.name}</h5>
                        </div>
                        <div className="arrows">
                          <div className="leftt" /*  onClick={carrouselLeft} */>
                            <ArrowBackIosIcon onClick={carrouselLeft} />
                          </div>

                          <div
                            className="rightt" /* onClick={carrouselRight} */
                          >
                            <ArrowForwardIosIcon onClick={carrouselRight} />
                          </div>
                        </div>
                        {currAlbum.songs &&
                          currAlbum.songs.map((song) => (
                            <div
                              key={song.id}
                              className={handleSelected(song.name)}
                            >
                              <p className="name">{song.name}</p>

                              <button
                                className="plus"
                                onClick={() => handleAddTop5(song)}
                              >
                                +
                              </button>
                              <button
                                className="minus"
                                onClick={() => handleMinusTop5(song)}
                              >
                                -
                              </button>
                            </div>
                          ))}

                        <div className="card_back_back">
                          <button
                            onClick={() => {
                              setShowFront((v) => !v);
                            }}
                          >
                            Back to albums
                          </button>
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </CSSTransition>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Songs artist={artist} />
      )}
    </>
  );
};

export default EditTop5;
