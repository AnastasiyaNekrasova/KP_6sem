import { Layout } from "./components/Layout.jsx";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { MainPage } from "./pages/MainPage";
import { ForumPage } from "./pages/ForumPage";
import { UserPlantsPage } from "./pages/UserPlantsPage.jsx";
import { PlantPage } from "./pages/PlantPage";
import { UserPostsPage } from "./pages/UserPostsPage.jsx";
import { PostPage } from "./pages/PostPage";
import { AddPlantPage } from "./pages/AddPlantPage";
import { AddPostPage } from "./pages/AddPostPage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { EditPlantPage } from "./pages/EditPlantPage";
import { EditPostPage } from "./pages/EditPostPage";
import { ProfilePage } from "./pages/ProfilePage.jsx";
import { ErrorPage000 } from "./pages/ErrorPage000.jsx";
import { ErrorPage } from "./pages/ErrorPage.jsx";
import { Chat, ChatPage } from "./pages/ChatPage.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./redux/features/auth/authSlice.js";
import { selectUserRole } from "./redux/features/auth/authSlice";
import { SetAvatar } from "./components/chat/SetAvatar.jsx";

function App() {
    const userRole = useSelector(selectUserRole);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    const validateId = (id) => {
        const idPattern = /^[0-9a-fA-F]{24}$/;
        return idPattern.test(id);
      };

    return (
        <Layout>
            <Routes>
                {/* Common routes */}
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                {/* Spec routes */}
                {userRole === "spec" && (
                    <>
                        <Route path="/forum" element={<ForumPage />} />
                        <Route path="/posts/new" element={<AddPostPage />} />
                        <Route path="/posts/:id" element={<PostPage />} />
                        <Route path="/plants/:id" element={<PlantPage />} />
                        <Route path="/plants/new" element={<AddPlantPage />} />
                        <Route path="/plants/:id/edit" element={<EditPlantPage />} />
                        <Route path="/chat" element={<ChatPage />} />
                        <Route path="/setAvatar" element={<SetAvatar />} />
                    </>
                )}
                {/* User routes */}
                {userRole === "user" && (
                    <>
                        <Route path="/forum" element={<ForumPage />} />
                        <Route path="/plants/:id" element={<PlantPage />} />
                        <Route path="/plants" element={<UserPlantsPage />} />
                        <Route path="/posts" element={<UserPostsPage />} />
                        <Route path="/posts/:id/edit" element={<EditPostPage />} />
                        <Route path="/posts/new" element={<AddPostPage />} />
                        <Route path="/posts/:id" element={<PostPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/plants/new" element={<ErrorPage />} />
                        <Route path="/chat" element={<ChatPage />} />
                        <Route path="/setAvatar" element={<SetAvatar />} />
                    </>
                )}
                <Route path="/*" element={<ErrorPage />} />
            </Routes>

            <ToastContainer position="bottom-right" />
        </Layout>
    );
}

export default App;
