import { Grid } from "semantic-ui-react";
import PreviewPublication from "./PublicationPreview";
import { map } from "lodash";
import "./Publications.scss";

const Publications = (props) => {
  const { getPublications } = props;

  return (
    <div className="publications">
      <h1>Publications</h1>
      <Grid columns={4}>
        {map(getPublications, (publication, index) => (
          <Grid.Column key={index}>
            <PreviewPublication publication={publication} />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
};

export default Publications;
