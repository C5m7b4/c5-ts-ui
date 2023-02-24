import React, { useState, useEffect } from 'react';

import './PSM.css';

export interface PSMProps {
  userid: number;
  confirmPasswordChange: (password: string) => void;
}

const PSM = (props: PSMProps) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(0);
  const [buttonActive, setButtonActive] = useState(false);
  const [passwordWarning, setPasswordWarning] = useState(
    'Password is required'
  );
  const [barOneClass, setBarOneClass] = useState('');
  const [barTwoClass, setBarTwoClass] = useState('');
  const [barThreeClass, setBarThreeClass] = useState('');
  const [barFourClass, setBarFourClass] = useState('');
  const [masterScore, setMasterScore] = useState(0);

  const passwordMinimum = 7;
  let mandatory = 0;

  useEffect(() => {
    calculateScore();
    if (passwordLength < passwordMinimum && passwordLength > 0) {
      setPasswordWarning('Password is too short');
    } else if (passwordLength > passwordMinimum) {
      setPasswordWarning('');
    }
  }, [password]);

  const calculateScore = () => {
    let intScore = 0;
    mandatory = 0;

    intScore = passwordLength;

    if (passwordLength > 0 && passwordLength <= 4) {
      intScore += passwordLength;
    } else if (passwordLength >= 5 && passwordLength <= 7) {
      intScore += 6;
    } else if (passwordLength >= 8 && passwordLength <= 15) {
      intScore += 12;
    } else if (passwordLength >= 16) {
      intScore += 18;
    }

    if (password.match(/[a-z]/)) {
      intScore += 5;
      mandatory++;
    }

    if (password.match(/[A-Z]/)) {
      intScore += 5;
      mandatory++;
    }

    if (password.match(/\d/)) {
      intScore += 5;
      mandatory++;
    }

    if (password.match(/[!,@,#,$,^,&,*,?,_,~]/)) {
      intScore += 5;
      mandatory++;
    }

    if (password.match(/(?:.*?[!,@,#,$,%,^,&,*,?,_,~]){2}/)) {
      intScore += 5;
    }

    if (password.match(/(?=.*[a-z])(?=.*[A-Z])/)) {
      intScore += 5;
    }

    switch (mandatory) {
      case 0:
        setBarOneClass('bad-password');
        setBarTwoClass('');
        setBarThreeClass('');
        setBarFourClass('');
        break;
      case 1:
        setBarOneClass('bad-password');
        setBarTwoClass('');
        setBarThreeClass('');
        setBarFourClass('');
        break;
      case 2:
        setBarOneClass('ok-password');
        setBarTwoClass('bad-password');
        setBarThreeClass('');
        setBarFourClass('');
        break;
      case 3:
        setBarOneClass('decent-password');
        setBarTwoClass('ok-password');
        setBarThreeClass('bad-password');
        setBarFourClass('');
        break;
      case 4:
        setBarOneClass('better-password');
        setBarTwoClass('decent-password');
        setBarThreeClass('ok-password');
        setBarFourClass('bad-password');
        break;
    }

    setMasterScore(intScore * 2);

    if (passwordLength > passwordMinimum && mandatory >= 4) {
      setBarOneClass('good-password');
      setBarTwoClass('good-password');
      setBarThreeClass('good-password');
      setBarFourClass('good-password');
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordLength(e.target.value.length);
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordWarning('Passwords do not match');
      return;
    }

    if (!props.userid || props.userid === 0) {
      setPasswordWarning('Please select a user');
      return;
    }

    props.confirmPasswordChange(password);
  };

  return (
    <div style={{ textAlign: 'center' }} className="password-wrapper">
      <div className="password-title-container">
        <div className="password-title">Password</div>
        <div className="password-warning" id="password-warning">
          {passwordWarning}
        </div>
      </div>
      <div className="password-instructions">
        <div>
          You need at least one special character, one number, one upperCase
          letter and one lowercase character.
        </div>
        <div>{` Also a minimum of ${passwordMinimum} characters.`}</div>
      </div>

      <div
        className={
          passwordLength === 0
            ? 'password-bar-container-hidden'
            : 'password-bar-container'
        }
      >
        <div className={`password-bar ${barOneClass}`} id="password-one"></div>
        <div className={`password-bar ${barTwoClass}`} id="password-one"></div>
        <div
          className={`password-bar ${barThreeClass}`}
          id="password-one"
        ></div>
        <div className={`password-bar ${barFourClass}`} id="password-one"></div>
      </div>
      <input
        className="password-input-1"
        type="password"
        autoComplete="off"
        onChange={handlePasswordChange}
        value={password}
        placeholder="Enter Password"
        name="password"
      />
      <input
        className="password-input-1"
        type="password"
        autoComplete="off"
        onChange={handleConfirmChange}
        value={confirmPassword}
        placeholder="Confirm Password"
        name="confirm"
      />
      <div className="int-score">{`Score: ${masterScore}`}</div>
      {!buttonActive ? (
        <div></div>
      ) : (
        <button className="btn btn-outline-dark" onClick={handleClick}>
          Submit
        </button>
      )}
    </div>
  );
};

export default PSM;
