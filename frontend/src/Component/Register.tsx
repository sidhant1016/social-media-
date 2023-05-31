import React, { Fragment, useState } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const Register = ( setAuth:any ) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const body = { email, name, password };

      const response = await axios.post('http://localhost:5001/auth/register', body);

      const parseResponse = response.data;

      if (parseResponse.token) {
        localStorage.setItem('token', parseResponse.token);

        setAuth(true);
        toast.success(`Welcome to the club, ${parseResponse.name.charAt(0).toUpperCase()}${parseResponse.name.substring(1)}!`);
      } else {
        setAuth(false);
        toast.error(parseResponse);
      }
    } catch (err:any) {
      console.error(err.message);
    }
  }

  const onChange = (e:any) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  }

  return (
    <Fragment>
      <h1 className="text-center my-5">Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control my-3"
          type="email"
          name="email"
          placeholder="enter email"
          value={email}
          onChange={onChange}
        />
        <input
          className="form-control my-3"
          type="text"
          name="name"
          placeholder="enter username"
          value={name}
          onChange={onChange}
        />
        <input
          className="form-control my-3"
          type="password"
          name="password"
          placeholder="Enter Password"
          value={password}
          onChange={onChange}
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/login">Login</Link>
    </Fragment>
  )
};

export default Register;