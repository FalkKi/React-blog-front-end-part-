import React, { useEffect, useState, useMemo } from "react";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useParams } from 'react-router-dom';
import axios from "../../axios.js";

const Index = () => {
  const [data, setData] = useState();
  const { id } = useParams();
  const [comment, setComment] = useState([]);
  const isID = Boolean(id);
  
  useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then((res) => {
        setData(res.data);
      });
    };
  }, []);
  
  const sendComment = async () => {
    const fields = {
      comment: comment,
    };
    try {
      if (isID) {
        await axios.post(`/posts/${id}`, fields);
      };

    } catch (err) {
      console.log(err)
    };
    setComment('');
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            label="Write a comment"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button onClick={sendComment} variant="contained">Send</Button>
        </div>
      </div>
    </>
  );
};
export default Index;