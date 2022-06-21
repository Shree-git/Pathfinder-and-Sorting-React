import { Grid } from "./Grid";

export const Board = () => {
  return (
    <div className="mainBoard">
      <Grid row={10} col={10}></Grid>
    </div>
  );
};
