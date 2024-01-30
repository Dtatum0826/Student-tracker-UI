import { useState } from 'react';

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [showStep2, setShowStep2] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleTokenChange = (e) => {
        setToken(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordsMatch(password === confirmPassword);
    };

    const handleIntiatePasswordReset = async () => {
        try {
                const response = await fetch('http://' + process.env.REACT_APP_ENPOINT + ':5000/auth/initiate-reset?email=' + email);
                if (response.ok) {
                    console.log('Password reset initiated successfully.');
                    setShowStep2(true);
                } else {
                    console.error('Failed to initiate password reset.');
                }
        } catch (error) {
            console.error('Error during password reset:', error);
        }
    }

    const handleResendVerification = async () => {
        try {
          const response = await fetch(`http://${process.env.REACT_APP_ENDPOINT}:5000/auth/initiate-reset?email=${email}`);
          if (response.ok) {
            console.log('Password reset initiated successfully.');
          } else {
            console.error('Failed to initiate password reset.');
          }
        } catch (error) {
          console.error('Error during password reset:', error);
        }
    };

    const handlePasswordReset = async () => {
        const reqBody = {
            password: password,
            token: token,
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reqBody),
        }
        if (passwordsMatch) {
            try {
                const response = await fetch('http://localhost:5000/auth/reset-password', requestOptions);
                if (response.ok) {
                    window.location.href = 'http://localhost:3000/';
                } else {
                    console.error('Failed to reset password.');
                }
            } catch (error) {
                console.error('Error during password reset:', error);
            }
        } else {
            console.error('Passwords do not match.');
        }
    }

    return (
      <div className="password-reset-container">
        <label>Email:
          <input type="text" value={email} onChange={handleEmailChange} />
        </label>
        <button onClick={handleIntiatePasswordReset}>Initiate Password Reset</button>
    
        {showStep2 && (
          <div>
            {/* Step 2: Enter Verification Code and New Password */}
            <label>Verification Code:
              <input type="text" value={token} onChange={handleTokenChange} />
            </label>
            <label>Password:
              <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <label>Confirm Password:
              <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
            </label>
            {passwordsMatch && <p>Passwords do not match</p>}
            <button onClick={handlePasswordReset} className="reset-password-button">Reset Password</button>
    
            {/* Button to resend verification code */}
            <button onClick={handleResendVerification} className="resend-verification-button">Resend Verification Code</button>
          </div>
        )}
      </div>
    );
}

export default PasswordReset;