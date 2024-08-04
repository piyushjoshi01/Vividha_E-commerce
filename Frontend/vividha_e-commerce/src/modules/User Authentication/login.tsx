import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { LoginData } from "../../types/authTypes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      username: loginData.username,
      password: loginData.password,
    };

    try {
      console.log("Sending payload:", payload); // Log the payload for debugging
      const response = await axios.post(
        "BackendLoadBalancer-2130855055.us-east-1.elb.amazonaws.com/auth/loginUser",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response data:", response.data.token);
      toast.success("Login successfull!");
      navigate("/");
      localStorage.setItem("accessToken", response.data.token);
    } catch (error) {
      console.error("Error in Axios request:", error);
      setError("Login failed. Please check your username and password.");
    }
  };

  return (
    <Box className="flex flex-col items-center mt-12 bg-gray-100 p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <Typography variant="h4" className="mb-6 text-gray-800">
        Login
      </Typography>
      <form onSubmit={handleSubmit} className="w-full">
        <TextField
          label="Username"
          name="username"
          value={loginData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          className="mb-4 bg-white rounded-lg"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={loginData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          className="mb-4 bg-white rounded-lg"
        />
        {error && (
          <Typography color="error" className="mb-4">
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          className="bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900"
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
