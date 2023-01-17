import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
// import { CommentsBlock } from '../components/CommentsBlock';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchTags } from '../requests/postRequests.js';
import { useState } from 'react';
import TagsBlock from '../components/TagsBlock';
import CommentsBlock from './../components/CommentsBlock';

export const Home = () => {
  const userData = useSelector(state => state.auth.data);
  const dispatch = useDispatch();
  const { posts, tags } = useSelector(state => state.posts);
  const [userPosts, setUserPosts] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  useEffect(() => {
    setUserPosts(posts.items);
  }, [posts.items]);

  const isPostsLoading = posts.status === 'loading';  //возвращает булевое значение в зависимости от стадии загрузки
  const isTagsLoading = tags.status === 'loading';

  const sortTitlesByViews = useCallback(() => {
    setValue(1);
    const postsItems = [...userPosts];
    const sortedPosts = postsItems.sort((a, b) => b.viewsCount - a.viewsCount);
    setUserPosts(sortedPosts);
  }, [userPosts]);

  const showNewTitles = useCallback(() => {
    setValue(0);
    setUserPosts(posts.items);
  }, [userPosts]);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={value} aria-label="basic tabs example">
        <Tab label="New" onClick={showNewTitles} />
        <Tab label="Most Popular" onClick={sortTitlesByViews} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : userPosts).map((el, ind) => isPostsLoading ?
            (<Post key={ind} isLoading={true} />) : (
              <Post key={ind}
                id={el._id}
                title={el.title}
                imageUrl={el.imageUrl ? `http://localhost:4444${el.imageUrl}` : ''}
                user={el.user}
                createdAt={el.createdAt}
                viewsCount={el.viewsCount}
                commentsCount={3}
                tags={el.tags}
                isEditable={userData?._id === el.user._id} // проверяем, соотетствует ли id юзера с id владельца поста, который отображен
              />
            ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[]}
          />
        </Grid>
      </Grid>
    </>
  );
};
