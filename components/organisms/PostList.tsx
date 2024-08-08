import React from 'react';
import {Post} from '@/types/postTypes';

interface PostListProps {
    posts: Post[];
    onUpdate: (id: number, title: string, content: string) => void;
    onDelete: (id: number) => void;
}

const PostList: React.FC<PostListProps> = ({posts, onUpdate, onDelete}) => {
    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <button onClick={() => onUpdate(post.id, post.title, post.content)}>Update</button>
                    <button onClick={() => onDelete(post.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default PostList;
