import React from 'react';
import moment from 'moment';
import Img from 'react-cool-img';
import defaultImg from '../../images/Gear-0.5s-108px.svg';

const Manual = (props) => {
    const post = props.post;
    const layout = () => {
        setTimeout(() => {
            props.layout();
        }, 100);
        
    };
    return (
        <article key={post.item_id} className="col-12 col-md-6 col-lg-4 grid-item manual-post">
            <div className="card">
                <div className="post-type">AFF</div>
                <a href={post.item_data.link} rel="noopener noreferrer" target="_blank">
                    <Img
                        placeholder={defaultImg}
                        src='https://placeimg.com/640/480/people'
                        className="card-img-top img-fluid"
                        onLoad={layout}
                        debounce={0}
                    />
                </a>
                <div className="card-block">
                    <p className="card-text">{post.item_data.text}</p>
                    <div className="card-link text-center">
                        <a href={post.item_data.link} rel="noopener noreferrer" target="_blank">{post.item_data.link_text}</a>
                    </div>
                    <p className="card-text"><small className="text-muted text-center">{moment(post.item_published).format('dddd Do MMMM YYYY')}</small></p>
                </div>
            </div>
        </article>
    )
}

export default Manual;