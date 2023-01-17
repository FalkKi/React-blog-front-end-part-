import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { Navigate, Link, useNavigate, useParams } from "react-router-dom";
import axios from '../../axios';
import { useDispatch } from 'react-redux';
import { fetchPosts } from './../../requests/postRequests';

export const AddPost = (props) => {
  
  const { id } = useParams();
  const isAuth = useSelector(state => state.auth.data);
  const inputFileRef = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState('');
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  console.log('isEditmode', isEditMode);

  const handleChangeFile = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();  // спец формат для заливки файлов на бэкенд
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
    };
  };

  useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then((res) => {
        setTitle(res.data.title || '');
        setText(res.data.text || '');
        setImageUrl(res.data.imageUrl || '');
        setTags(res.data.tags.join(', ') || '');
      });
    };
  }, []);

  

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);


  const onSubmit = async () => {
    const fields = {
      title: title,
      imageUrl: imageUrl,
      text: text,
      tags: tags
    };
    try {
      setIsLoading(true);
      const { data } = isEditMode ? await axios.patch(`/posts/${id}`, fields) : await axios.post('/posts', fields);
      const titleId = isEditMode ? id : data._id;
      navigate(`/posts/${titleId}`);
    } catch (err) {
      console.warn(err, 'error occured when creating title');
    };
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to='/' />
  };

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => { inputFileRef.current.click() }} variant="outlined" size="large">
        Load Preview
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Delete
          </Button>
          <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Header of the title..."
        fullWidth
      />
      <TextField
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Tags"
        fullWidth
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditMode ? 'Save' : 'Publish'}
        </Button>
        <Link to="/">
          <Button size="large">Go back</Button>
        </Link>
      </div>
    </Paper>
  );
};
