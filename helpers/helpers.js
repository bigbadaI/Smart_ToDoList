
//checks two arrays to see if they include any matching values
const findCommonElements = function (arr1, arr2) {
  return arr1.some(item => arr2.includes(item));
};

//building an object to compare types to categories
let compareObj = {
  'To Watch': ['Movie', 'TVSeries', 'SportsTeam', 'MovieSeries', 'Painting', 'TVEpisode'],
  'To Listen To': ['Compsition', 'MusicGroup', 'BroadcastService', 'RadioSeries', 'RadioStation', 'MusicAlbum', 'MusicRelease', 'Audiobook'],
  'To Read': ['Book', 'ComicBook', 'BookSeries', 'ComicSeries', 'Newspaper', 'NewsArticle'],
  'To Visit': ['Place', 'Restaurant', 'TouristAttraction', 'Accommodation', 'CivicStructure', 'Landform', 'LocalBusiness', 'TouristDestination', 'LandmarksOrHistoricalBuildings'],
  'To Play': ['Game', 'VideoGame', "VideoGameSeries"]
};





module.exports = { findCommonElements, compareObj };
