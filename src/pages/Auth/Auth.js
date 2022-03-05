import { useState } from "react";
import { Container, Image } from "semantic-ui-react";
import instaclone from "../../asset/png/logo.png";
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";

import "./Auth.scss";

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Container fluid className="auth">
      <Image src={instaclone} />
      <div className="auth__form">
        {showLogin ? (
          <LoginForm />
        ) : (
          <RegisterForm setShowLogin={setShowLogin} />
        )}
      </div>
      <div className="auth__change-form">
        <p>
          {showLogin ? (
            <>
              No tienes cuenta?
              <span onClick={() => setShowLogin(!showLogin)}>Registrate</span>
            </>
          ) : (
            <>
              Entra con tu cuenta!
              <span onClick={() => setShowLogin(!showLogin)}>
                Iniciar secion
              </span>
            </>
          )}
        </p>
      </div>
    </Container>
  );
};

export default Auth;

