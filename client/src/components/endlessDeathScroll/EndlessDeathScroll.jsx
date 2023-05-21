import React from 'react'

import { useDispatch, useSelector } from 'react-redux';

import StoriesTray from '../storiesTray/StoriesTray';
import MediaCard from '../mediaCard/MediaCard';

import { getPosts } from '../../slices/posts';

function EndlessDeathScroll() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  console.log(posts)
  React.useEffect(() => {
    const fetchPosts = async () => {
      await getPosts(dispatch);
    };
    fetchPosts();
  }, [dispatch]);

  return (
    <div>
        <div>
            <StoriesTray/>
        </div>
        <div>
            {posts.map(id => (
                <MediaCard key={id} id={id}/>
            ))}
        </div>
    </div>
  )
}

export default EndlessDeathScroll