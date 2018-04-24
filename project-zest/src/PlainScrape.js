import { get } from "https";

// PlainScrape

function scrape(url) {
    var urlF = encodeURI(url)
    var hostName = this.getHostName(urlF)

    var wholePage = fetch(url)
        .then((response) => {
            console.log(response);
        })
}

function getHostName(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        return match[2];
    }
    else {
        return null;
    }
}

scrape("https://www.foodnetwork.com/recipes/alton-brown/the-chewy-recipe-1909046")