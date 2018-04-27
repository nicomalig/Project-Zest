// Client-side web scraping
// Happy Cappy
// Capstone 2018

import React, { Component } from 'react';
import TextField from "material-ui/TextField";
import RaisedButton from 'material-ui/RaisedButton';

class Scraper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tf: 'https://www.foodnetwork.com/recipes/alton-brown/the-chewy-recipe-1909046',
        }
        // this.handleType = this.handleType.bind(this)
        // this.scrape = this.scrape.bind(this)
    }

    handleType = (e) => {
        var url = e.target.value
        console.log(url);
        
        this.setState({
            tf: url
        })
    }

    // Scrape a page and save the JSON'ified recipe into this component's state
    scrape = (e) => {
        e.preventDefault()
        var url = this.state.tf // TODO: validate
        console.log("url: " + url)
    
        fetch(url, {
            method: 'GET'
            }).then((response) => {
                console.log(response.status);
                response.text().then((text) => {
                    // now we need to parse the text, but we
                    // have it!
                    console.log(text);
                    
                    
                    
                })
                // .then(data => ({
                //     data: data,
                //     status: response.status,
                // })
                // ).then(res => {
                //     console.log(res.status, res.data.title)
                //     console.log("What");

                // })
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
                <TextField 
                    id="scrape-field" 
                    value={this.state.tf} 
                    onChange={this.handleType} 
                /><br />

                <RaisedButton 
                    label="Scrape!" 
                    onClick={this.scrape} 
                />
            </div>
        );
    }
}

export default Scraper;
