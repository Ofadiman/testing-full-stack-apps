import { Box, Button } from "@mui/material";
import { FC, useState } from "react";

export const DEFAULT_INITIAL_COUNT = 0;
export const DEFAULT_INCREMENT_BY = 1;
export const DEFAULT_DECREMENT_BY = 2;

export const COUNTER_DATA_CY = {
  CURRENT_COUNT: "current-count",
  INCREMENT: "up",
  DECREMENT: "down",
};

export const Counter: FC<{
  initialCount?: number;
  incrementBy?: number;
  decrementBy?: number;
}> = (props) => {
  const [state, setState] = useState<number>(
    props.initialCount ?? DEFAULT_INITIAL_COUNT,
  );

  return (
    <div>
      <Button
        onClick={() => {
          setState(
            (prev) => prev + (props.incrementBy ?? DEFAULT_INCREMENT_BY),
          );
        }}
        data-cy={COUNTER_DATA_CY.INCREMENT}
      >
        increment
      </Button>
      <Box data-cy={COUNTER_DATA_CY.CURRENT_COUNT}>current count: {state}</Box>
      <Button
        onClick={() => {
          setState(
            (prev) => prev - (props.decrementBy ?? DEFAULT_DECREMENT_BY),
          );
        }}
        data-cy={COUNTER_DATA_CY.DECREMENT}
      >
        decrement
      </Button>
    </div>
  );
};
