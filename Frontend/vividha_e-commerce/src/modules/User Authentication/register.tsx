import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RegisterData } from "../../types/authTypes";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterData>({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        "BackendLoadBalancer-2130855055.us-east-1.elb.amazonaws.com/auth/signUpUser",
        {
          username: formData.username,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
        }
      );
      console.log(response.data);
      toast.success("Successfully Registered");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box className="flex flex-col items-center mt-12 bg-gray-100 p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <Typography variant="h4" className="mb-6 text-gray-800">
        Register
      </Typography>
      <form onSubmit={handleSubmit} className="w-full">
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          className="mb-4 bg-white rounded-lg"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          className="mb-4 bg-white rounded-lg"
        />
        <TextField
          label="Mobile"
          name="mobile"
          value={formData.mobile}
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
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          className="mb-4 bg-white rounded-lg"
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
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
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
