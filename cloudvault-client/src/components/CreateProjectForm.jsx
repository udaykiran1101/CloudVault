// src/components/CreateProjectForm.jsx
import React, { useState } from 'react';
import { supabase } from '../supabase';

function CreateProjectForm({ onProjectCreated }) {
  const [projectName, setProjectName] = useState('');
  const [status, setStatus] = useState('');
  const [user, setUser] = useState(null);

  // Fetch user once on mount
  React.useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    if (!projectName.trim()) {
      setStatus('❌ Project name cannot be empty.');
      return;
    }

    // Step 1: Create the project
    const { data: projectData, error: projectError } = await supabase
      .from('projects')
      .insert([{ name: projectName }])
      .select()
      .single();

    
if (projectError) {
  console.error('❌ Error creating project:', projectError); // print full error
  setStatus('❌ Failed to create project.');
  return;
}

    // Step 2: Add the creator as a member
    const { error: memberError } = await supabase
      .from('project_members')
      .insert([{ project_id: projectData.id, user_id: user.id }]);

    if (memberError) {
      console.error('❌ Failed to add project member:', memberError.message);
      setStatus('✅ Project created, but failed to add as member.');
    } else {
      setStatus('✅ Project created and added as member!');
      onProjectCreated(projectData); // Notify Dashboard of new project
      setProjectName('');
    }
  };

  if (!user) return <p>Loading user info...</p>;

  return (
    <div className="container mt-4">
      <h4>Create New Project</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Create Project
        </button>
      </form>

      {status && (
        <div className="alert alert-info mt-3" role="alert">
          {status}
        </div>
      )}
    </div>
  );
}

export default CreateProjectForm;

