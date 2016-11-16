
 topTenSongsApp.controller('mainController',  ['$scope',  '$rootScope','Spotify', '$location', function ($scope, $rootScope, Spotify,  $location) {
	$scope.inputText = "Enter name to search";
	
	//we set the topten list as rootscope so all controllers can access it
	$rootScope.topTenList = [];
	$rootScope.topTenList.title = "";
	$rootScope.topTenList.songs = [];
	
	//this is for our goofy error message
	$rootScope.searchEmptyError = false;
	
	//for the three search functions: artist, track and album searches
	
	$scope.searchArtist = function () {
		if ($scope.searchInput == null || $scope.searchInput == '') {
			$rootScope.searchEmptyError = true;
		}
		else {
			$location.path('searchArtist/' + $scope.searchInput);
			$rootScope.searchEmptyError = false;
		}
	};
	
	$scope.searchAlbum = function () {
		if ($scope.searchInput == null || $scope.searchInput == '') {
			$rootScope.searchEmptyError = true;
		}
		else {
			$location.path('searchAlbum/' + $scope.searchInput);
			$rootScope.searchEmptyError = false;
		}
	};
	
	$scope.searchTrack = function () {
		if ($scope.searchInput == null || $scope.searchInput == '') {
			$rootScope.searchEmptyError = true;
		}
		else {
			$location.path('searchTrack/' + $scope.searchInput);
				$rootScope.searchEmptyError = false;
		}
	};
}]);

 
 topTenSongsApp.controller('artistSearchController', ['$scope', '$rootScope', 'Spotify', '$routeParams', function ($scope, $rootScope, Spotify, $routeParams) {

	//the options object for the Spotify control
	$scope.options = [];
	$scope.options.limit = 5;
	$scope.options.offset = 0;
 
	//grab the search input from the template
 	var searchInput = $scope.artistSearch = $routeParams.artistSearch;
	$scope.inputText = searchInput;
	
	searchSpotify();
	
	function searchSpotify() {
		Spotify.search(searchInput, 'artist', $scope.options).then(function (data) {
			console.log("artists: " + JSON.stringify(data));
			$scope.searchResults = data.artists.items;
		  });
	}
	
	//these functions allow for paging of results
	$scope.searchNextArtists = function () {
		
		$scope.options.offset = $scope.options.offset + $scope.options.limit;
		console.log("offset: " + $scope.options.offset);
		searchSpotify();
	}

	$scope.searchPreviousArtists = function () {
		
		$scope.options.offset = $scope.options.offset - $scope.options.limit;
		console.log("offset: " + $scope.options.offset);
		searchSpotify();
	}
	  
	 
}]);


 topTenSongsApp.controller('albumSearchController', ['$scope', '$rootScope','Spotify', '$routeParams', function ($scope, $rootScope, Spotify, $routeParams) {

	$scope.options = [];
	$scope.options.limit = 5;
	$scope.options.offset = 0;
	
 	var searchInput = $scope.albumSearch = $routeParams.albumSearch;
	console.log("search: " + searchInput);
	
	searchSpotify();
	
	//this is the search function of the spotify api
	//we encase it in a function so we can call it later for paging
	function searchSpotify() {
		Spotify.search(searchInput, 'album', $scope.options).then(function (data) {
			console.log("albums: " + JSON.stringify(data));
			$scope.searchResults = data.albums.items;
		});
	}
	
	
	$scope.searchNextAlbums = function () {
		
		$scope.options.offset = $scope.options.offset + $scope.options.limit;
		console.log("offset: " + $scope.options.offset);
		searchSpotify();
	}

	$scope.searchPreviousAlbums = function () {
		
		$scope.options.offset = $scope.options.offset - $scope.options.limit;
		console.log("offset: " + $scope.options.offset);
		searchSpotify();
	}
	  
	
}]);



 topTenSongsApp.controller('topTenController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
	$scope.nameTopTenList = function () {
		console.log("in name lsit");		
		if ($scope.topTenNameInput == '' || $scope.topTenNameInput == null) {
		}
		else {
			$rootScope.topTenList.title = $scope.topTenNameInput;
		}
	}
	
	//this function allows us to enter information about a song in our top 10 list
	$scope.editTrackInfo = function (trackIndex) {
		$location.path('editTrack/' + trackIndex);
	}

	//the export function. I'm sure there's an easier way to do this.
	//todo: fix it
	$scope.exportTopTenList = function () {
		//var topTenListText =  JSON.stringify($rootScope.topTenList);

		var topTenListText = "{\r\n  title: '" + $rootScope.topTenList.title + "'\r\n";
		var songList = $rootScope.topTenList.songs;
		
		var songs = '  songs: [\r\n';
		
		songList.forEach(function(track) {
			songs =  songs + "      {\r\n          track: '" + track.name + "'\r\n";
			songs =  songs + "          artist: '" + track.artist + "'\r\n";
			songs =  songs + "          album: '" + track.album + "'\r\n";
			songs =  songs + "          note: '" + track.note + "'\r\n";
			songs =  songs + "          customImage: '" + track.customImage + "'\r\n      },\r\n";
	
		});
		
		
		topTenListText = topTenListText + songs + "  ]\r\n}";
		
		console.log("toptenlist: " + topTenListText);		
		
		
		var blob = new Blob([topTenListText], {
			type: "text/plain;charset=utf-8"
		});

		saveAs(blob, "topTenList.txt");
	};
	
}]);

 topTenSongsApp.controller('trackSearchController', ['$scope', '$rootScope', 'Spotify', '$routeParams', function ($scope,  $rootScope, Spotify, $routeParams) {

	//we could have put this in rootscope but the limits vary in our design for each search
	$scope.options = [];
	$scope.options.limit = 10;
	$scope.options.offset = 0;
 	
	var searchInput = $scope.trackSearch = $routeParams.trackSearch;
	console.log("track: " + searchInput);
	
	searchSpotify();
	
	function searchSpotify() {
		Spotify.search(searchInput, 'track', $scope.options).then(function (data) {
			console.log("tracks: " + JSON.stringify(data));
			$scope.searchResults = data.tracks.items;
		});
	}
	
	$scope.addSong = function (songId) {
		console.log('song:' + songId);

		
		Spotify.getTrack(songId).then(function (data) {
		  	console.log('track info:' + data.artists[0].name + "--" + JSON.stringify(data));

			var track =[];
			track.name = data.name;
			track.artist = data.artists[0].name;
			track.album = data.album.name;
			track.customImage = "";
			track.note = "";
			
			$rootScope.topTenList.songs.push(track);


		});
		
    };
	
	$scope.searchNextTracks = function () {
		
		$scope.options.offset = $scope.options.offset + $scope.options.limit;
		console.log("offset: " + $scope.options.offset);
		searchSpotify();
	}

	$scope.searchPreviousTracks = function () {
		
		$scope.options.offset = $scope.options.offset - $scope.options.limit;
		console.log("offset: " + $scope.options.offset);
		searchSpotify();
	}
	
	
}]);

topTenSongsApp.controller('trackEditController', ['$scope', '$rootScope', '$routeParams', function ($scope,  $rootScope,  $routeParams) {
	 var trackIndex = $scope.trackIndex = $routeParams.trackId;
		
	//these functions allows us to add a note and an image to our top ten list songs		
	$scope.addNote = function () {
		if ($scope.trackNoteInput != '' && $scope.trackNoteInput != null) {
			$rootScope.topTenList.songs[trackIndex].note = $scope.trackNoteInput;
		}
	}
	
	$scope.addCustomImageUrl = function () {
		$rootScope.topTenList.songs[trackIndex].customImage = $scope.customImageInput;
		console.log("input is: " +  $scope.customImageInput);
	}
		
}]);



 topTenSongsApp.controller('albumsArtistSearchController', ['$scope', 'Spotify', '$routeParams', function ($scope, Spotify, $routeParams) {

 
	$scope.options = [];
	$scope.options.limit = 5;
	$scope.options.offset = 0;
	
 	var artistId = $scope.artistId = $routeParams.artistId;
 
	
	Spotify.getArtist(artistId).then(function (data) {
		console.log('artist info: ' + JSON.stringify(data));
		$scope.artistName = data.name;
		$scope.artistURL = data.images[0].url;
	});
	
	searchSpotify();
	
	function searchSpotify() {
		Spotify.getArtistAlbums(artistId, $scope.options).then(function (data) {
			console.log("albums: " + JSON.stringify(data));
			$scope.searchResults = data.items;
		});
	}
	
	$scope.searchNextAlbums = function () {
		
		$scope.options.offset = $scope.options.offset + $scope.options.limit;
		console.log("offset: " + $scope.options.offset);
		searchSpotify();
	}

	$scope.searchPreviousAlbums = function () {
		
		$scope.options.offset = $scope.options.offset - $scope.options.limit;
		console.log("offset: " + $scope.options.offset);
		searchSpotify();
	}
	
}]);


 topTenSongsApp.controller('trackAlbumSearchController', ['$scope', '$rootScope', 'Spotify', '$routeParams', function ($scope, $rootScope, Spotify, $routeParams) {

	$scope.options = [];
	$scope.options.limit = 10;
	$scope.options.offset = 0;
 
 	var albumId = $scope.albumId = $routeParams.albumId;
 
	Spotify.getAlbum(albumId).then(function (data) {
		
		$scope.albumName = data.name;
		$scope.albumURL = data.images[0].url;
		$scope.artistName = data.artists[0].name;
		console.log('artist name: ' + $scope.artistName );
		console.log('album info: ' + JSON.stringify(data));
	});
 
	searchSpotify();
	
	function searchSpotify() {
		Spotify.getAlbumTracks(albumId, $scope.options).then(function (data) {
			console.log("songs: " + JSON.stringify(data));
			$scope.searchResults = data.items;
		});
	}
		
	$scope.addSong = function (songId) {
		console.log('song:' + songId);

		
		Spotify.getTrack(songId).then(function (data) {
		  	console.log('track info:' + data.artists[0].name + "--" + JSON.stringify(data));

			var track = [];
			track.name = data.name;
			track.artist = data.artists[0].name;
			track.album = data.album.name;
			track.customImage = "";
			track.note = "";
			
			$rootScope.topTenList.songs.push(track);


		});
		
    };
	
	$scope.searchNextTracks = function () {
		
		$scope.options.offset = $scope.options.offset + $scope.options.limit;
		console.log("offset: " + $scope.options.offset);
		searchSpotify();
	}

	$scope.searchPreviousTracks = function () {
		
		$scope.options.offset = $scope.options.offset - $scope.options.limit;
		console.log("offset: " + $scope.options.offset);
		searchSpotify();
	}
	
}]);


 
