

var topTenSongsApp = angular.module('topTenSongs', ['spotify', 'ngRoute', 'ui.router']);

topTenSongsApp.config(['$routeProvider', 'SpotifyProvider', '$stateProvider', function($routeProvider,  SpotifyProvider, $stateProvider ) {
		
	
	SpotifyProvider.setClientId('123456789123456789');
    SpotifyProvider.setRedirectUri('http://example.com/callback.html');
    SpotifyProvider.setScope('playlist-read-private');
	
	
    $routeProvider.
                when('/home', {templateUrl: './templates/spotify_search.html',   controller: 'mainController'}).
                when('/searchArtist/:artistSearch', {templateUrl: './templates/artist_search.html',   controller: 'artistSearchController'}).
                when('/searchAlbum/:albumSearch', {templateUrl: './templates/album_search.html',   controller: 'albumSearchController'}).
                when('/searchTrack/:trackSearch', {templateUrl: './templates/track_search.html',   controller: 'trackSearchController'}).
				when('/searchArtistAlbums/:artistId', {templateUrl: './templates/album_search.html',   controller: 'albumsArtistSearchController'}).
				when('/songsInAlbum/:albumId', {templateUrl: './templates/track_search.html',   controller: 'trackAlbumSearchController'}).
				when('/editTrack/:trackId', {templateUrl: './templates/edit_track_info.html',   controller: 'trackEditController'}).
                when('/viewTopTen', {templateUrl: './templates/top_ten_display.html',   controller: 'topTenController'}).
				//when('/detail/:itemId', {templateUrl: './templates/product_detail.html',   controller: detailControl}).
                otherwise({redirectTo: '/home'});
}]);