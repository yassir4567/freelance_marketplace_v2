import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import styles from "./FreelancerLayout.module.css";
import { useRequiredAuth } from "../context/AuthContext";

export default function FreelancerLayout() {
  const { user } = useRequiredAuth();

  const navlinks = [
    {
      label: "Dashboard",
      to: "/freelancer/dashboard",
    },
    {
      label: "Browse Projects",
      to: "/freelancer/browse-project",
    },
    {
      label: "My Proposals",
      to: "/freelancer/proposals",
    },
    {
      label: "Contracts",
      to: "/freelancer/contracts",
    },
    {
      label: "Messages",
      to: "/freelancer/messages",
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
