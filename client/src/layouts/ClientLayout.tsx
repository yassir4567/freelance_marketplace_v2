import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import styles from "./ClientLayout.module.css";
import { useRequiredAuth } from "../context/AuthContext";

export default function ClientLayout() {
  const { user } = useRequiredAuth();
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
      label: "Projects and Proposals",
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
      <Header
        links={navlinks}
        fullName={user.firstName + " " + user.lastName}
      />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
