import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import reactStringReplace from 'react-string-replace';
import moment from 'moment';
import Img from 'react-cool-img';




const parseTweet = (text) => {
    let replacedText;

    // Match URLs
    replacedText = reactStringReplace(text, /(https?:\/\/\S+)/g, (match, i) => (
        <a key={match + i} href={match} rel="noopener noreferrer" target="_blank">{match}</a>
    ));

    // Match @-mentions
    replacedText = reactStringReplace(replacedText, /@(\w+)/g, (match, i) => (
        <a key={match + i} href={`https://instagram.com/${match}`} rel="noopener noreferrer" target="_blank">@{match}</a>
    ));

    // Match hashtags
    replacedText = reactStringReplace(replacedText, /#(\w+)/g, (match, i) => (
        <a key={match + i} href={`https://instagram.com/explore/tags/${match}`} rel="noopener noreferrer" target="_blank">#{match}</a>
    ));

    // Match HTML Entities
    replacedText = reactStringReplace(replacedText, /&(\S+)/g, (match, i) => {
        var parser = new DOMParser();
        var dom = parser.parseFromString('&' + match, 'text/html');
        var decodedString = dom.body.textContent;
        return (
            decodedString
        )
    });

    return replacedText;
}

const Instagram = (props) => {
    const post = props.post;
    const layout = () => {
        props.layout(); 
    }
    return (
    <article key={post.item_id} className="col-12 col-md-6 col-lg-4 grid-item instagram-post">
        <div className="card">
            <div className="post-type"><FontAwesomeIcon icon={faInstagram} /></div>
            <a href={post.item_data.link}>
                <Img
                    src={post.item_data.link + 'media/?size=l'}
                    className="card-img-top img-fluid"
                    onLoad={layout}
                    debounce={0}
                />
            </a>
            <div className="card-block">
                <h4><a href={'https://instagram.com/' + post.item_data.user.username} rel="noopener noreferrer" target="_blank">{post.item_data.user.username}</a></h4>
                <p className="card-text">{parseTweet(post.item_data.caption)}</p>
                <p className="card-text"><small className="text-muted">{moment(post.item_published).format('dddd Do MMMM YYYY')}</small></p>
            </div>
        </div>
    </article>
    )
}

export default Instagram;