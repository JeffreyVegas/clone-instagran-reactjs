import "./UserNotFound.scss";

const UserNotFound = () => {
  return (
    <div className="user-not-found">
      <h2 className="user-not-found__title">Usuario no encontrado</h2>
      <p>Es posible que el usuario no exista o haya sido eliminado</p>
    </div>
  );
};

export default UserNotFound;
