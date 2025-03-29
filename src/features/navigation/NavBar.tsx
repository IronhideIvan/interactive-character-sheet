import { JSX } from "react";

type NavBarProps = {

};

const NavBar = (props: NavBarProps): JSX.Element => {
  return <div>{JSON.stringify(props)}</div>;
};

export default NavBar;
