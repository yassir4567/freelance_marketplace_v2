import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import styles from "./ClientLayout.module.css";

export default function ClientLayout() {
  const navlinks = [
    {
      label: "Dashboard",
      to: "/client/dashboard",
    },
    {
      label: "Post Project",
      to: "/client/post-project",
    },
    {
      label: "Projects",
      to: "/client/projects",
    },
    {
      label: "Contracts",
      to: "/client/contracts",
    },
    {
      label: "Messages",
      to: "/client/messages",
    },
  ];

  return (
    <div className={styles.container}>
      <Header links={navlinks} />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
