import { FC } from "react";

interface Props {
  msg: string;
}

const App: FC<Props> = ({ msg }) => {
  // A comment
  return <div>{msg}</div>;
};
