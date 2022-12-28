import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Auth/Signup';
import Signin from './components/Auth/Signin';
import Feed from './components/Feed';
import CreatePost from './components/Post/CreatePost';
import ShowUser from './components/People/ShowUser';
import PostComments from './components/Post/PostComments';
import MyPosts from './components/Post/MyPosts';
import Error from './components/Error/Error';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/error" element={<Error />} />
      <Route path="/posts/:me" element={<MyPosts />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/users/:id" element={<ShowUser />} />
      <Route path="/post/:postId/comments" element={<PostComments />} />

    </Routes>
  )
}

export default App
