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
} from "../../redux/top5Sclice";
import "./ArtistDetail.css";
import Songs from "../Songs";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import StatusSongs from "../StatusSongs";
import { GetArtistDiscography } from "../../spotify/Spotify";

const ArtistDiscography = () => {
  const [showFront, setShowFront] = useState(true);
  const [albums, setAlbums] = useState([]);
  const { id } = useParams();
  const [artist, setArtist] = useState([]);
  const [view, setView] = useState("albums");
  const [currAlbum, setCurrAlbum] = useState({});

  const [currAlbumPoss, setCurrAlbumPoss] = useState(1);

  const top5 = useSelector((state) => state.top5.top5);
  const currArtist = useSelector((state) => state.top5.currentArtist);
  const dispatch = useDispatch();

  useEffect(() => {
    GetArtist();
  }, []);

  const GetArtist = async () => {
    const artistDiscography = await GetArtistDiscography(id);
    setAlbums(artistDiscography);
    setCurrAlbum(artistDiscography[currAlbumPoss - 1]);
    setArtist(currArtist);
  };

  const carrouselLeft = () => {
    if (currAlbumPoss !== 1) {
      setCurrAlbumPoss(currAlbumPoss - 1);
      setCurrAlbum(albums[currAlbumPoss - 2]);
    }
    if (currAlbumPoss === 1) {
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

  const handleSelected = (name) => {
    if (top5.some((i) => i.name === name)) {
      return "card_songs_selected";
    } else {
      return "card_songs";
    }
  };

  const handleAddTop5 = (song, currAlbum) => {
    const { name, id, url } = currAlbum;

    const songi = {
      songId: song.id,
      name: song.name,
      albumName: name,
      albumId: id,
      albumUrl: url,
    };
    /*albumName: name,
      albumId: id,
      albumUrl: url,
      currAlbum, */

    dispatch(AddTop5Redux(songi));
  };
  const handleMinusTop5 = (song) => {
    const songi = {
      songId: song.id,
      name: song.name,
    };

    dispatch(MinusTop5Redux(songi));
  };

  return (
    <>
      <div className="coni">
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
          <h3 className="albums_container">
            {currAlbum.name} ({currAlbum.year})
          </h3>
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
                                onClick={() => handleAddTop5(song, currAlbum)}
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

export default ArtistDiscography;
