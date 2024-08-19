import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import EndPoints from '../api/EndPoints';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fullName = localStorage.getItem('fullName');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (fullName) {
          setUserName(fullName);
          setLoginStatus(true);
        } else {
          fetchUserFullName(decodedToken.sub);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        setLoginStatus(false);
      }
    }
  }, []);

  const fetchUserFullName = async (userId) => {
    try {
      const response = await axios.get(EndPoints.USERS);
      const users = response.data;
      const user = users.find(user => user.id === userId);
      if (user) {
        const fullName = `${user.name.firstname} ${user.name.lastname}`;
        setUserName(fullName);
        localStorage.setItem('fullName', fullName);
      }
      setLoginStatus(true);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoginStatus(false);
    }
  };

  const login = (token) => {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    fetchUserFullName(decodedToken.sub);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    setUserName('');
    setLoginStatus(false);
  };

  return (
    <AuthContext.Provider value={{ loginStatus, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);