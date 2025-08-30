import React, { useState, useEffect ,useRef} from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import UploadForm from '../components/UploadForm';
import FileList from '../components/FileList';
import CreateProjectForm from '../components/CreateProjectForm';
import ProjectSelector from '../components/ProjectSelector';
import InviteUserForm from '../components/InviteUserForm.jsx'

function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const fileListRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);
  
    const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };
  
  if (!user) return <p>Loading user...</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
      <h2>Welcome, {user.email}</h2>
       <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <CreateProjectForm
        onProjectCreated={(newProj) => setActiveProject(newProj)}
      />

      <ProjectSelector user={user} onProjectSelect={setActiveProject} />

      {activeProject && (
        <>
          <h5 className="mt-4 text-success">
            Active Project: {activeProject.name}
          </h5>
          <InviteUserForm project={activeProject} />
          <UploadForm user={user} project={activeProject} onUploadComplete={() => fileListRef.current?.refresh()} />
          <FileList user={user} project={activeProject} ref={fileListRef}/>
        </>
      )}
    </div>
  );
}

export default Dashboard;

