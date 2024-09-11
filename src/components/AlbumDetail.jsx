import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import "./AlbumsDetail.css";

const AlbumDetail = () => {
  const ClientId = "186edb51b04148d99e7c55ed02ebc0fa";
  const ClientSecret = "24db6b43a228490f81bdada8879ec536";
  const { id } = useParams();
  /*   let { state } = useLocation(); */

  const [token, setToken] = useState("");
  const artistID = id.split("-")[0];
  const albumId = id.split("-")[1];
  const [album, setAlbum] = useState({});
  const a = false;
  //const top5 = useSelector((state) => state.top5.top5);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchParameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    search();
  }, [token]);

  useEffect(() => {
    searchSongs();
  }, [album.id]);

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
  //console.log(token)

  const search = async () => {
    console.log("cago todo", album);
    if (Object.keys(album).length == 0) {
      const albumss = await fetch(
        "https://api.spotify.com/v1/artists/" +
          artistID +
          "/albums" +
          "?include_groups=album&market=US&limit=50",
        searchParameters,
      );
      const s = await albumss.json();
      //console.log(typeof s, s);

      if (Object.values(s).length > 0) {
        const sw = s.items
          .map((album) => ({
            id: album.id,
            name: album.name,
            url: album.images[0].url,
          }))
          .filter((album) => album.id === albumId)
          .reduce((acc, cur) => (acc = cur), {});

        setAlbum(sw);
      }
      console.log("cago todo2", album);
    }
  };

  const searchSongs = async () => {
    console.log("me muero");

    if (Object.keys(album).length > 0) {
      //console.log(album);

      const songs = await fetch(
        "https://api.spotify.com/v1/albums/" + album.id + "/tracks",
        searchParameters,
      );
      const a = await songs.json();
      const songss = await a.items.map((song) => ({
        name: song.name,
        id: song.id,
        album: { albumName: album.name, albumId: album.id },
      }));
      console.log("hoi", songss);
      album.songs = [...songss];

      setAlbum(album);
    }
  };

  console.log(album.songs);

  return (
    <div className="cont">
      <h1>AlbumDetail </h1>
      <h3>{album.name}</h3>
      <img src={album.url} alt="" width={400} height={400} />
      <div className="">
        {album.songs &&
          album.songs.map((song) => (
            <div key={song.id} className="songs">
              <p>{song.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AlbumDetail;
