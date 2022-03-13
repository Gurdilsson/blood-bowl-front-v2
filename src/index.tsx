import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './routes/Login'
import Home from './routes/Home';
import NotFound from './routes/NotFound';
import LoadingPage from './LoadingPage/LoadingPage';
import PersonalPage from './routes/PersonalPage';
import TeamPage from './routes/TeamPage';
import TeamCreationPage from './Team/TeamCreationPage';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path="loading" element={<LoadingPage />} />
      <Route path="personal-page" element={<PersonalPage />} />
      <Route path="teams" element={<TeamPage/>} />
      <Route path="create-team" element={<TeamCreationPage/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
