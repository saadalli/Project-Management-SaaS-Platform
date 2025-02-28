'use client'
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import FormInput from "./components/common/FormInput";
import Button from "./components/common/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      if (mode === 'login') {
        // Handle login
        const response = await axios.post('http://localhost:8080/api/v1/user/login', { email, password });
        console.log(response)
        const { role } = response.data;
        localStorage.setItem('token',response.data.token)

        if (role === 'admin') {
          router.push('/admin');
        } else if (role === 'employee') {
          router.push('/employee');
        }
      } else {
        // Handle signup
        await axios.post('http://localhost:8080/api/v1/user/signup', { name, email, password });
        setMode('login'); // Switch to login mode after successful signup
      }
    } catch (err) {
      setError(mode === 'login' ? 'Invalid email or password' : 'Error during signup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg text-black shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {mode === 'login' ? 'Login' : 'Signup'}
        </h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {mode === 'register' && (
          <FormInput
            label="Name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        )}

        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <Button onClick={handleSubmit} disabled={loading}>
          {loading
            ? mode === 'login'
              ? 'Logging in...'
              : 'Signing up...'
            : mode === 'login'
            ? 'Login'
            : 'Signup'}
        </Button>

        <p className="mt-4 text-center">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setMode('register')}
              >
                Signup
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setMode('login')}
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
