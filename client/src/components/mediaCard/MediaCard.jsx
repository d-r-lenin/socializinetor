import React, {
    useEffect,
} from 'react';

import './MediaCard.scss';

import {
    IoEllipsisHorizontal,
    IoHeartOutline,
    // IoHeartSharp,
    IoChatbubbleOutline,
    // IoChatbubbleSharp,
    IoPaperPlaneOutline,
    // IoPaperPlaneSharp,
    IoBookmarkOutline,
    // IoBookmarkSharp,
} from 'react-icons/io5';


import {
    useDispatch,
    useSelector
} from 'react-redux';

import {
    getPostOfId,
    likePost,
    unlikePost,
} from '../../slices/posts';
import postApi from '../../APIs/post';
import profileApi from '../../APIs/profile';
profileApi.getOneProfile('test1');
// import Loading from '../loading/Loading';

function MediaCard({ id }) {
    const dispatch = useDispatch()
    const post = useSelector((state) => state.posts.postsRender[id]);
    const currentUser = useSelector((state) => state.auth.user);
    useEffect(() => {
        const fetchPost = async () => {
            getPostOfId(id, dispatch)
        };
        fetchPost();
    }, [dispatch, id]);
    console.log(post)
    
    function likeHandle(e) {
        e.preventDefault();
        if (post.isLiked) {
            return unlikePost(id, dispatch);
        }
        return likePost(id, dispatch);
    }

    const card = (post) => (
        <div className="card">
            <div className="card__header">
                <div className="card__profile">
                    <img className="card__profile-pic" src={postApi.getMediaLink(post.image)} alt="random" />
                </div>
                <div className="card__username-holder">
                    <div className="card__username">{post.username}</div>
                    <div className="card__posted-time">
                        <span className="dot">&#8226;</span>
                        {new Date(post.createdAt).toLocaleTimeString()}
                    </div>
                </div>

                <div className="card__options">
                    <div className="card__options-icon">
                        <IoEllipsisHorizontal />
                    </div>
                </div>
            </div>

            <div className="card__body">
                <div className="card__body-text">{post.body}</div>
                <img className="card__body-pic" src={postApi.getMediaLink(post.image)} alt="random" />
            </div>

            <div className="card__footer">
                <div className="card__interaction-tray">
                    <div className={`card__like-btn card__interaction-icon ${post.isLiked ? "card__like-btn--liked" : ""}`} onClick={likeHandle}>
                        <IoHeartOutline />
                    </div>
                    <div className="card__comment-btn card__interaction-icon">
                        <IoChatbubbleOutline />
                    </div>
                    <div className="card__share-btn card__interaction-icon">
                        <IoPaperPlaneOutline />
                    </div>
                </div>
                <div className="card__save-btn card__interaction-icon">
                    <IoBookmarkOutline />
                </div>
            </div>
            <div className="card__after-footer">
                <div className="card__likes">{post?.likes?.length} likes</div>
            </div>
        </div>
    );

  return (<>
    {post && post.isLoading ? 'loading': post && card(post)}
  </>)
}



export default MediaCard