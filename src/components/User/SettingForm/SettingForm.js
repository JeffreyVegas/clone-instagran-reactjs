import { Button } from "semantic-ui-react";
import useAuth from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import PasswordForm from "../PasswordForm";
import InfoForm from "../InfoForm";
import "./SettingForm.scss";

const SettingForm = (props) => {
  const {
    setChildrenModal,
    setShowModal,
    settitleModal,
    refetch,
    getUser,
  } = props;
  const { logout } = useAuth();
  const client = useApolloClient();
  const history = useHistory();

  const onlogout = () => {
    client.clearStore();
    logout();
    history.push("/");
  };

  const onHandleModal = (type, name, placeholder, title) => {
    switch (type) {
      case "password":
        settitleModal("Cambiar Contrasena");
        setChildrenModal(<PasswordForm onlogout={onlogout} />);
        break;
      case "info":
        settitleModal(title);
        setChildrenModal(
          <InfoForm
            name={name}
            placeholder={placeholder}
            setShowModal={setShowModal}
            getUser={getUser}
            refetch={refetch}
          />
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="setting-form">
      <Button
        onClick={() =>
          onHandleModal("info", "name", "Nuevo Nombre", "Actulizar Nombre")
        }
      >
        Cambiar Nombre
      </Button>
      <Button
        onClick={() =>
          onHandleModal("info", "email", "Nuevo Email", "Actulizar Email")
        }
      >
        Email
      </Button>
      <Button onClick={() => onHandleModal("password")}>
        Cambiar contrasena
      </Button>
      <Button
        onClick={() =>
          onHandleModal("info", "siteWeb", "sitio web", "Actulizar sitio Web")
        }
      >
        Sitio Web
      </Button>
      <Button
        onClick={() =>
          onHandleModal(
            "info",
            "description",
            "nueva descripcion",
            "Actulizar descripcion"
          )
        }
      >
        Descripcion
      </Button>
      <Button onClick={onlogout}>Cerrar Sesion</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  );
};

export default SettingForm;
