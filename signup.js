const domContainer = document.querySelector("#container");
const root = ReactDOM.createRoot(domContainer);

const { useState } = React;

const LoginForm = () => {
  const [emailColor, setEmailColor] = useState(false);
  const [email, setEmail] = useState("");
  const [passwordColor, setPasswordColor] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [country, setCountry] = useState("");
  const [display, setDisplay] = useState("signup");
  const [birthdateColor, setBirthdateColor] = useState(false);
  const [birthdate, setBirthdate] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const validateEmail = () => {
    return /[a-z0-9]@gmail.es$/.test(email);
  };

  const validatePassword = () => {
    if (password.length <= 5) {
      return "weak";
    } else if (password.length > 5 && password.length <= 10) {
      return "medium";
    } else if (password.length > 10) {
      return "hard";
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const passwordInputType = showPassword ? "text" : "password";

  const validateForm = (e) => {
    e.preventDefault();
    if (validateEmail() && validatePassword()) {
      console.log("Acceso correcto");
    } else {
      console.log("Acceso Denegado");
    }
    setShowNotification(true);
  };

  const optionsCountry = () => {
    return countries.map((country, i) => (
      <option key={i}>{country.name}</option>
    ));
  };

  const checkBirthdate = () => {
    let today = new Date();
    let dateOfBirthday = new Date(birthdate);
    let age = today.getFullYear() - dateOfBirthday.getFullYear();
    let m = today.getMonth() - dateOfBirthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dateOfBirthday.getDate())) {
      age--;
    }
    return age >= 18;
  };

  if (display == "signup") {
    return (
      <div className="bodyCreateAccount">
        <img
          className="imageLogin"
          src="/Images/image3d2.png"
          width={600}
          height={600}
        ></img>
        <div className="mainBox">
          <form onSubmit={validateForm}>
            <h1>Create Account</h1>
            <p>
              <strong>Email</strong>
            </p>
            <div className="emailInput">
              <input
                className={
                  emailColor ? (validateEmail() ? "valid" : "invalid") : ""
                }
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onClick={() => setEmailColor(true)}
              />{" "}
              {validateEmail() && <div className="validEmail">valid email</div>}
            </div>
            <p>
              <strong>Password</strong>
            </p>
            <div className="passwordInput">
              <input
                className={
                  passwordColor
                    ? validatePassword() === "weak"
                      ? "weak"
                      : validatePassword() === "medium"
                      ? "medium"
                      : validatePassword() === "hard"
                      ? "hard"
                      : ""
                    : ""
                }
                type={passwordInputType}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onClick={() => setPasswordColor(true)}
              />
              <span
                className={`eyeIcon ${showPassword ? "visible" : ""}`}
                onClick={togglePasswordVisibility}
              >
                👁️
              </span>
            </div>
            <p>
              <strong>Country</strong>
            </p>
            <select
              className="selectCountry"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {optionsCountry()}
            </select>
            <div className="checkRadio">
              <label>Male</label>
              <input
                className="radio"
                type="radio"
                name="gender"
                id="male"
                value="male"
              />
              <label>Female</label>
              <input
                className="radio"
                type="radio"
                name="gender"
                id="female"
                value="female"
              />
              <label>Other</label>
              <input
                className="radio"
                type="radio"
                name="gender"
                id="Undisclosed"
                value="Undisclosed"
              />
            </div>
            <p>Day of Birth</p>
            <input
              className={
                birthdateColor ? (checkBirthdate() ? "valid" : "invalid") : ""
              }
              required
              name="birthdate"
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              onClick={() => setBirthdateColor(true)}
            />
            {checkBirthdate() && <div className="validAge">valid age</div>}
            <p className="inputBox">
              <input className="box" type="checkbox" /> I accept the terms of
              service
            </p>
            <p className="inputBox">
              <input className="box" type="checkbox" /> Acceptance to join the
              Mailing List{" "}
            </p>
            <div className="buttons">
              <button className="submit" type="submit">
                Submit
              </button>

              {showNotification && (
                <div className="notification">You successfully submitted</div>
              )}

              <p className="login">Are you already registered?</p>

              <button onClick={() => setDisplay("login")}>Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bodyLogin">
        <div className="displayBox">
          <img className="displayUser" src="/Images/user.png" alt="user" />
          <form onSubmit={validateForm}>
            <h1 className="nameLogin">Login</h1>
            <p className="nameEmail">Email:</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <p className="namePassword">Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="buttonsLogin">
              <div className="buttonSubmitLogin">
                <button type="submit">Submit</button>
              </div>
              <div className="buttonSignUpLogin">
                <button onClick={() => setDisplay("signup")}>Signup</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

const element = (
  <>
    <LoginForm />
  </>
);

root.render(element);
