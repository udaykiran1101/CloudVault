import React, { useState, useEffect ,useRef} from 'react';
import { supabase } from '../supabase';
import UploadForm from '../components/UploadForm';
import FileList from '../components/FileList';
import CreateProjectForm from '../components/CreateProjectForm';
import ProjectSelector from '../components/ProjectSelector';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const fileListRef = useRef();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  if (!user) return <p>Loading user...</p>;

  return (
    <div className="container mt-4">
      <h2>Welcome, {user.email}</h2>

      <CreateProjectForm
        onProjectCreated={(newProj) => setActiveProject(newProj)}
      />

      <ProjectSelector onProjectSelect={setActiveProject} />

      {activeProject && (
        <>
          <h5 className="mt-4 text-success">
            Active Project: {activeProject.name}
          </h5>
          <UploadForm user={user} project={activeProject} onUploadComplete={() => fileListRef.current?.refresh()} />
          <FileList user={user} project={activeProject} ref={fileListRef}/>
        </>
      )}
    </div>
  );
}

export default Dashboard;

