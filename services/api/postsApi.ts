import client from './client';
import { Post } from '@/types/postTypes';

const fetchPosts = () => client.get<Post[]>('/posts');
const createPost = (post: Post) => client.post<Post>('/posts', post);
const updatePost = (post: Post) => client.put<Post>(`/posts/${post.id}`, post);
const deletePost = (id: number) => client.delete(`/posts/${id}`);

export default {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
};
