import { Container } from "semantic-ui-react";
import Header from "../components/Header";

const LayoutBasic = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default LayoutBasic;
