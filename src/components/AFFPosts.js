import React, { useEffect, useState , useMemo, useRef} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from '../actions/AFFPostsActions';
import { getPosts, getPostsPending, getPostsError } from '../reducers/AFFPostsReducer';
import Masonry from 'react-masonry-component';
import Twitter from './postTypes/twitter';
import Instagram from './postTypes/instagram';
import Manual from './postTypes/manual';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSync } from '@fortawesome/free-solid-svg-icons';

const AFFPosts = () => {
    const posts = useSelector(getPosts);
    const isLoading = useSelector(getPostsPending);
    const error = useSelector(getPostsError);
    const dispatch = useDispatch();
    let msnry = useRef(null);
    //state 
    const [page, setPage] = useState(1);
    const [numPosts] = useState(20);
    const [postsFilter, setPostsFilter] = useState('');
    const [disableButtons, SetDisableButtons] = useState(false);
    const [FilterButtons, setFilterButtons] = useState([
        { 
            name: 'aff',
            type: 'manual',
            icon: null,
            label: 'AFF',
            isActive: false
        },
        { 
            name: 'twitter',
            type: 'twitter',
            icon: faTwitter,
            label: 'Twitter',
            isActive: false
        },
        { 
            name: 'instagram',
            type: 'instagram',
            icon: faInstagram,
            label: 'Instagram',
            isActive: false
        }
    ]);

    //Get data from API
    useEffect(() => {
        SetDisableButtons(true);
        dispatch(fetchPosts(page, numPosts));
    },[dispatch, page, numPosts]);


    // Event Handlers
    const handleFilterPosts = (postType) => {
        SetDisableButtons(true);
        if(postType.length > 1){
            if (postType !== postsFilter) {
                const fb = FilterButtons.map(el => ({...el, isActive: false}));
                const fbb = fb.map(el => (el.type === postType ? {...el, isActive: true} : el));
                setPostsFilter(postType);
                setFilterButtons(fbb);
            }else{
                setPostsFilter(null);
                const fb = FilterButtons.map(el => ({...el, isActive: false}));
                setFilterButtons(fb);
            }
        }
    }

    const handleLoadMore = (e) => {
        SetDisableButtons(true);
        e.preventDefault();
        setPage(page + 1);
    }

    const handleLayoutComplete = () => {
        setTimeout(() => {
            SetDisableButtons(false);
        }, 500);
       
    } 

    const updateLayout = () => {
        console.log('update layout');
        if(msnry.current){ 
            msnry.current.masonry.reloadItems();
            msnry.current.masonry.layout();
        }
    }

    // Filter posts
    const filteredPosts = useMemo(() => {
        if (postsFilter) {
            const p = posts.filter(item => item.service_slug === postsFilter);
            return p;
        } else {
            return posts;
        }
    },[posts, postsFilter]);

    if (error) { return <div className="text-center">No posts found</div> }
        
    const childElements = filteredPosts.map((post, index) => {
        // Manual Post
        if (post.service_slug === 'twitter'){
            return (
                <Twitter post={post} key={index} />
            )
        } else if (post.service_slug === 'instagram') {
            return (
                <Instagram post={post} key={index} layout={updateLayout} />
            )
        } else {
            return (
                <Manual post={post} key={index} layout={updateLayout} />
            )
        }
    });

    return (
        <section>
            <section className="row filter-row">
                {
                    FilterButtons.map((btn) => {
                        return (
                        <div key={btn.name} className="col-4">
                            <button id={btn.name + '-btn'} disabled={disableButtons ? 'disabled' : ''} className={btn.isActive ? 'btn btn-secondary active' : 'btn btn-secondary' } onClick={() => handleFilterPosts(btn.type)}>{btn.icon ? <FontAwesomeIcon icon={btn.icon} /> : ""} <span className={btn.icon ? "d-none d-md-inline" : "" }>{btn.label}</span></button>
                        </div>
                        )
                    })
                }
            </section>
            <section>
                <Masonry ref={msnry}
                    className={'post-list row'}
                    onImagesLoaded={handleLayoutComplete}
                >
                {childElements}
                </Masonry>
            </section>
            <div className="row">
                <div className="col-12 text-center mt-3">
                    <button id="loadMoreButton" disabled={disableButtons ? 'disabled' : ''} className="btn btn-primary" onClick={handleLoadMore}>{isLoading ? <FontAwesomeIcon icon={faSync} spin /> : 'Load More'}</button>
                </div>
            </div>
        </section>
    )
}

export default AFFPosts;