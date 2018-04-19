// Client-side web scraping
// Happy Cappy
// Capstone 2018

import React, { Component } from 'react';

// var database

class Scraper extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        // database = this.props.db
    }

    // Scrape a page and save the JSON'ified recipe into this component's state
    scrape(url) {
        var urlF = encodeURI(url)
        var hostName = this.getHostName(urlF)

        var wholePage = fetch(url)
            .then((response) => {
                console.log(response);
            })
    }
    
    getHostName(url) {
        var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
            return match[2];
        }
        else {
            return null;
        }
    }

render() {
    return (
        <div className="flex-item">
            <p>Scrape!</p>
            {this.scrape("https://www.foodnetwork.com/recipes/alton-brown/the-chewy-recipe-1909046")}
        </div>
    );
}
}

export default Scraper;
