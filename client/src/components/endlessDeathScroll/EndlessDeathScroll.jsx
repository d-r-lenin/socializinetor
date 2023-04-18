import React from 'react'

import { generateRandomPosts } from '../../dummy/posts';

import StoriesTray from '../storiesTray/StoriesTray';
import MediaCard from '../mediaCard/MediaCard';

function EndlessDeathScroll() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const fetchPosts = async () => {
      let posts;
      try{
        posts = await generateRandomPosts();
      } catch (err) {
        console.error(err);
        posts = [];
      }

      setPosts(posts);
      console.log(posts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
        <div>
            <StoriesTray/>
        </div>
        <div>
            {posts.map(post => (
                <MediaCard key={post._id} post={post}/>
            ))}
        </div>
    </div>
  )
}

export default EndlessDeathScroll