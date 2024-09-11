/* eslint-disable no-unused-vars */
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  changeStatus,
  clearTop5Redux,
  currArtistRedux,
} from "../../redux/top5Sclice";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import StatusSongs from "../StatusSongs";
import { GetArtists } from "../../spotify/Spotify";

const Home = () => {
  const ClientId = "186edb51b04148d99e7c55ed02ebc0fa";
  const ClientSecret = "24db6b43a228490f81bdada8879ec536";
  const [token, setToken] = useState("");
  const [albums, setAlbums] = useState([]);
  /*  const [songs, setSongs] = useState([]); */
  const [artists, setArtists] = useState([]);
  /*  const [search, setSearch] = useState(""); */
  const [searchArtist, setSearchArtist] = useState("");
  /* const [artistID, setArtistID] = useState(""); */
  const userEmail = useSelector((state) => state.user.email);
  const top5 = useSelector((state) => state.top5.top5);
  const dispatch = useDispatch();

  const [currImg, setCurrImg] = useState(1);

  /*  const [currArtistt, setCurrArtistt] = useState(artists[currImg]); */
  /*  useEffect(() => {
    getToken();
  }, [albums]); */

  /* const getToken = async () => {
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
  }; */

  /*const search = async () => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" +
        search +
        "&type=artist" +
        "&limit=5",
      searchParameters,
    )
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        artistID(data.artists.items[0].id);
        return data.artists.items[0].id;
      });

    /* const albumss = await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
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
      }); 
  };*/

  /* const songi = async () => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    albums.forEach(async (album) => {
      const songs = await fetch(
        "https://api.spotify.com/v1/albums/" + album.id + "/tracks",
        searchParameters,
      )
        .then((res) => res.json())
        .then((data) => {
          const newState = albums.map((obj) => {
            album.songs = data.items.map((song) => ({
              name: song.name,
              id: song.id,
              album: { albumName: album.name, albumId: album.id },
            }));

            return obj;
          });

          setAlbums(newState);
        });
    });
  }; */

  const serchArtist = async () => {
    const artist = await GetArtists(searchArtist);
    setArtists(artist);
    // console.log(a);

    /* const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" +
        searchArtist +
        "&type=artist" +
        "&limit=5",
      searchParameters,
    )
      .then((res) => res.json())
      .then((data) => {
        setArtists(
          data.artists.items
            .filter((artist) => artist.images.length > 0)
            .map((artist) => ({
              id: artist.id,
              name: artist.name,
              url: artist.images[0].url,
              genres: artist.genres,
              followers: artist.followers.total,
            })),
        );
      }); */
  };

  const carrouselLeft = () => {
    if (currImg !== 1) {
      setCurrImg(currImg - 1);
    }
    if (currImg === 1) {
      setCurrImg(4);
    }
  };

  const carrouselRight = () => {
    if (currImg !== 4) {
      setCurrImg(currImg + 1);
    }
    if (currImg === 4) {
      setCurrImg(1);
    }
  };

  const handlePageChange = (page) => {
    setCurrImg(page);
  };

  return (
    <div>
      <div className="top5_container">
        <StatusSongs />
        <h4>Choose your Artist</h4>
        <div className="top5_sep">
          <input
            placeholder="choose your artist"
            type="text"
            value={searchArtist}
            onChange={(e) => setSearchArtist(e.target.value)}
          />
          <button onClick={serchArtist}>Search</button>
        </div>
      </div>
      {userEmail}
      {/* {top5.map((i) => (
        <div className="top5_asd" key={i.id}>
          {i.name}
        </div>
      ))} */}
      {artists.length > 0 ? (
        <div className="top5_subcontainer">
          <h3>{artists[currImg - 1].name}</h3>
          <div className="top5_carrousel">
            <div
              className="top5_carrouselInner"
              style={{ backgroundImage: `url(${artists[currImg - 1].url})` }}
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

          {/* <div className="top5_circulos">
            {[0, 1, 2, 3].map((i) => (
              <div key={i}>
                {i === currImg ? (
                  <Brightness1Icon style={{ color: "rgb(26, 23, 23, 0.6)" }} />
                ) : (
                  <Brightness1Icon style={{ color: "rgb(26, 23, 23, 0.2)" }} />
                )}
              </div>
            ))}
          </div> */}
          <ResponsivePagination
            current={currImg}
            total={4}
            onPageChange={(page) => handlePageChange(page)}

            /*
                        total={totalPages}
                        onPageChange={setCurrentPage} */
            /* current={currAlbumPoss} */

            /* onPageChange={(page) => handlePageChange(page)} */
          />
          <button
            className="top5_link"
            onClick={() => {
              const currArtist = artists[currImg - 1];
              console.log(currArtist);
              dispatch(currArtistRedux({ currArtist }));

              dispatch(changeStatus(1));
              dispatch(clearTop5Redux());
            }}
          >
            <Link to={"/Artist/" + artists[currImg - 1].id}>Discografia</Link>
          </button>
        </div>
      ) : (
        <div>Busca el artista</div>
      )}
    </div>
  );
};
export default Home;
