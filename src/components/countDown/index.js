import { useInterval } from "../../hooks/useInterval";
import { computeCountdownInfo } from "../../utils";
import { useEffect, useState } from "react";

const CountDown = (props) => {
  const { offsetTimestamp } = props;
  const [time, setTime] = useState(offsetTimestamp);

  useInterval(() => {
    setTime((time) => time - 1);
  }, 1000);

  return <span>{computeCountdownInfo(time)}</span>;
};

export default CountDown;
