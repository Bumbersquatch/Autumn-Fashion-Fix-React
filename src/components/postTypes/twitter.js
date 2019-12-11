import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import reactStringReplace from 'react-string-replace';
import moment from 'moment';

const parseTweet = (text) => {
    let replacedText;

    // Match URLs
    replacedText = reactStringReplace(text, /(https?:\/\/\S+)/g, (match, i) => (
        <a key={match + i} href={match}>{match}</a>
    ));

    // Match @-mentions
    replacedText = reactStringReplace(replacedText, /@(\w+)/g, (match, i) => (
        <a key={match + i} href={`https://twitter.com/${match}`}>@{match}</a>
    ));

    // Match hashtags
    replacedText = reactStringReplace(replacedText, /#(\w+)/g, (match, i) => (
        <a key={match + i} href={`https://twitter.com/hashtag/${match}`}>#{match}</a>
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

const Twitter = (props) => {
    const post = props.post;
    return (
    <article key={post.item_id} className="col-12 col-md-6 col-lg-4 grid-item twitter-post">            
                <div className="card card-block text-center">
                    <div className="post-type"><FontAwesomeIcon icon={faTwitter} /></div>
                    <h4><a href={'https://twitter.com/' + post.item_data.user.username} rel="noopener noreferrer" target="_blank">{post.item_data.user.username}</a></h4>
                    <blockquote className="card-blockquote">
                    <p>{parseTweet(post.item_data.tweet)}</p>
                    <footer>
                        <small>
                        {moment(post.item_published).format('dddd Do MMMM YYYY')}
                        </small>
                    </footer>
                    </blockquote>
                </div>
    </article>
    )
}

export default Twitter;