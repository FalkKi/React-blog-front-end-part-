import Container from "@mui/material/Container";
import { Header } from "./components";
import { Routes, Route } from 'react-router-dom';
import { Home, Registration, AddPost, Login } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { fetchLogin } from "../src/requests/authRequests";
import UserTags from './components/UserTags';
import FullPost from './pages/FullPost.jsx';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.data);

  React.useEffect(() => {
    dispatch(fetchLogin(isAuth));
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/tags/:name" element={<UserTags/>} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
