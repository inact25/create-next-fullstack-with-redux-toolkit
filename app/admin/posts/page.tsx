"use client"
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store';
import {createPost, deletePost, fetchPosts, updatePost} from '@/store/slices/postsSlice';
import PostList from "@/components/organisms/PostList";
import PostForm from "@/components/organisms/PostForm";

const HomePage = () => {
    const dispatch: any = useDispatch<AppDispatch>();
    const posts = useSelector((state: RootState) => state.posts.posts);
    const loading = useSelector((state: RootState) => state.posts.loading);
    const error = useSelector((state: RootState) => state.posts.error);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleCreatePost = (title: string, content: string) => {
        dispatch(createPost({id: 0, title, content}));
    };

    const handleUpdatePost = (id: number, title: string, content: string) => {
        dispatch(updatePost({id, title, content}));
    };

    const handleDeletePost = (id: number) => {
        dispatch(deletePost(id));
    };

    return (
            <div>
                <h1>Posts</h1>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                <PostList posts={posts} onUpdate={handleUpdatePost} onDelete={handleDeletePost}/>
                <PostForm onSubmit={handleCreatePost}/>
            </div>
    );
};

export default HomePage;
