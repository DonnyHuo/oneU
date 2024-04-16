import { computeCountdownInfo } from "../../utils";
import { useEffect, useState } from "react";

const CountDown = (props) => {

  const { offsetTimestamp } = props;

  const [time, setTime] = useState(offsetTimestamp);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time === 0) {
        clearInterval(timer);
      } else {
        setTime((time) => time - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <span>{computeCountdownInfo(time)}</span>;
};

export default CountDown;
