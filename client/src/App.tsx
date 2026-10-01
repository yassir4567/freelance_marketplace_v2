import { useEffect, useState } from "react";

function App() {
  const [projects, setProjects] = useState<any>([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data.projects));
  }, []);

  console.log(projects);

  return <h1>hello world</h1>;
}

export default App;
