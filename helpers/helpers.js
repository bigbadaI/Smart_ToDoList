
/**
 * Compare two arrays to check if they have any identical values.
 * @param {*} arr1 First array to compare elements.
 * @param {*} arr2 Second array to compare elements.
 * @return {Boolean} Return true if there is a matching item in both arrays.
 */
const findCommonElements = function (arr1, arr2) {
  return arr1.some(item => arr2.includes(item));
};


//building an object to compare types to categories
/**
 * An object to hold all of the categories to be displayed (as keys), and their corresponding types (as an array), as returned from the Google search.
 */
let compareObj = {
  'To Watch': ['Movie', 'TVSeries', 'SportsTeam', 'MovieSeries', 'Painting', 'TVEpisode'],
  'To Listen To': ['Compsition', 'MusicGroup', 'BroadcastService', 'RadioSeries', 'RadioStation', 'MusicAlbum', 'MusicRelease', 'Audiobook'],
  'To Read': ['Book', 'ComicBook', 'BookSeries', 'ComicSeries', 'Newspaper', 'NewsArticle'],
  'To Play': ['Game', 'VideoGame', "VideoGameSeries"]
};


/**
 * Check the categories object to find a category with a type array value that matches a type of the Google search element.
 */
const queryMatch = function(arr, obj) {
  for (let element of arr) {
    for (let key in obj) {
      let match = findCommonElements(obj[key], element);
      if (match) {
        console.log("+++++++ LOOK AT ME +++++++", key);
        return key;
      }
    }
  }
};


/**
 * Search Yelp for a query match.
 */
const yelpSearch = function(yelpClient, queryParams, arr, text) {
  return yelpClient.search(queryParams).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    let names = response.jsonBody.businesses[0].name;
    const yelpUrl = response.jsonBody.businesses[0].url;
    const prettyJson = JSON.stringify(firstResult, null, 4);

    console.log(prettyJson, `\n`, names);
    // types = response.jsonBody.businesses[0].name;
    console.log("==== Where is this =====", names);

    arr[1] = text + ": ", arr[2] = 'To Visit', arr[3] = names, arr[5] = yelpUrl;
  }).catch(error => {
    console.log(error);
    return false;
  });
};


module.exports = { findCommonElements, compareObj, queryMatch, yelpSearch };
