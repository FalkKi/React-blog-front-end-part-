import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
// import { CommentsBlock } from "../components/CommentsBlock";
import axios from '../axios.js';
import ReactMarkdown from 'react-markdown';
import { useSelector, useDispatch } from 'react-redux';
import Index from './../components/AddComment/index';
import CommentsBlock from './../components/CommentsBlock';
import { fetchComments } from './../requests/postRequests';


const FullPost = () => {
  const comments = useSelector(state => state.comments.comments.items);
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts.items);
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  // const params = useParams();  //хранит id текущей статьи
  const { id } = useParams(); //лучше сразу написать так

  useEffect(() => {
    axios.get(`posts/${id}`).then((res) => {
      setData(res.data);
      setLoading(false);
    }).catch((err) => {
      console.warn(err)
    });
    dispatch(fetchComments());
  }, []);


  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  };

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={[]} // добавить потом комменты
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};

export default FullPost;