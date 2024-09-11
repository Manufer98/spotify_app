/* eslint-disable prettier/prettier */
const ClientId = "186edb51b04148d99e7c55ed02ebc0fa";
const ClientSecret = "24db6b43a228490f81bdada8879ec536";

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



export const GetToken = async () => {
	return await fetch("https://accounts.spotify.com/api/token", authParameters)
		.then((res) => res.json())
		.then((data) => data.access_token);
};

export const GetArtists = async (searchArtist) => {

	const token = await GetToken();

	const searchParameters = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	};
	const artists = await fetch(
		"https://api.spotify.com/v1/search?q=" +
		searchArtist +
		"&type=artist" +
		"&limit=4",
		searchParameters,
	)
		.then((res) => res.json())
		.then((data) => {
			return data.artists.items
				.filter((artist) => artist.images.length > 0)
				.map((artist) => ({
					id: artist.id,
					name: artist.name,
					url: artist.images[0].url,
					genres: artist.genres,
					followers: artist.followers.total,
				}));
		});


	return artists;

}

export const GetArtistDiscography = async (id) => {

	const token = await GetToken();

	const searchParameters = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	};

	const albums = await fetch(
		"https://api.spotify.com/v1/artists/" +
		id +
		"/albums" +
		"?include_groups=album&market=US&limit=50",
		searchParameters,
	)
		.then((res) => res.json())
		.then((data) => {
			return data.items.map((album) => ({
				id: album.id,
				name: album.name,
				url: album.images[0].url,
				year: album.release_date.split("-")[0],
			}));
		});

	console.log(albums);


	albums.forEach(async album => {

		const callSongs = await fetch(
			"https://api.spotify.com/v1/albums/" + album.id + "/tracks",
			searchParameters,
		);

		const songs = await callSongs.json();



		album.songs = songs.items.map((song) => ({
			name: song.name,
			id: song.id,
			album: { albumName: album.name, albumId: album.id },
		}));

	});

	return albums;


};
