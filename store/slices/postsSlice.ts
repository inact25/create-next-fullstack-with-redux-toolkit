import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import postsApi from '../../services/api/postsApi';
import { Post } from '@/types/postTypes';

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchPosts',
  async () => {
    const response = await postsApi.fetchPosts();
    return response.data;
  },
);

export const createPost = createAsyncThunk<Post, Post>(
  'posts/createPost',
  async (post: Post) => {
    const response = await postsApi.createPost(post);
    return response.data;
  },
);

export const updatePost = createAsyncThunk<Post, Post>(
  'posts/updatePost',
  async (post: Post) => {
    const response = await postsApi.updatePost(post);
    return response.data;
  },
);

export const deletePost = createAsyncThunk<number, number>(
  'posts/deletePost',
  async (id: number) => {
    await postsApi.deletePost(id);
    return id;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id,
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
