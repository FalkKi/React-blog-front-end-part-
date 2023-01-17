import React from "react";
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Post } from '../components/Post';
import TagsBlock from "./TagsBlock";
import CommentsBlock from "./CommentsBlock";

const UserTags = () => {
   const { posts, tags } = useSelector(state => state.posts);
   const userData = useSelector(state => state.auth.data);
   const params = useParams();
   const isPostsLoading = posts.status === 'loading';  //возвращает булевое значение в зависимости от стадии загрузки
   const isTagsLoading = tags.status === 'loading';

   const filterPostsTags = () => {
      const filteredPosts = posts.items.filter((el) => el.tags.includes(params.name));
      if (filteredPosts.length === 0) {
         return ['There are no posts'];
      };
      return filteredPosts;
   };

   return (
      <div>
         <Grid container spacing={4}>
            <Grid xs={8} item>
               {(isPostsLoading ? [...Array(5)] : filterPostsTags()).map((el, ind) => isPostsLoading ?
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
                  items={[
                     {
                        user: {
                           fullName: 'Вася Пупкин',
                           avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                        },
                        text: 'Это тестовый комментарий',
                     },
                     {
                        user: {
                           fullName: 'Иван Иванов',
                           avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                        },
                        text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                     },
                  ]}
               />
            </Grid>
         </Grid>
      </div>
   );
};

export default UserTags;