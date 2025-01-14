import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
  const { signInWithGoogle, signInWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmail(email, password);
    } catch (error) {
      console.error("Error during email login:", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <p className="text-center">Please login to access the movie ranking app</p>
              <button
                className="btn btn-primary btn-block mb-3"
                onClick={signInWithGoogle}
              >
                Login with Google
              </button>
              <form onSubmit={handleEmailLogin}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3">
                  Login with Email
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;