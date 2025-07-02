import React, { useState } from 'react';
import { supabase } from '../supabase';

function CreateProjectForm({ onProjectCreated }) {
  const [projectName, setProjectName] = useState('');
  const [status, setStatus] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!projectName.trim()) {
      setStatus('⚠️ Project name is required.');
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Step 1: Insert into 'projects'
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert([{ name: projectName, owner_id: user.id }])
      .select()
      .single();

    if (projectError) {
      console.error(projectError);
      setStatus('❌ Error creating project: ' + projectError.message);
      return;
    }

    // Step 2: Add creator to 'project_members'
    const { error: memberError } = await supabase
      .from('project_members')
      .insert([{ project_id: project.id, user_id: user.id, role: 'owner' }]);

    if (memberError) {
      console.error(memberError);
      setStatus('❌ Project created, but failed to add as member.');
    } else {
      setStatus('✅ Project created and member added!');
    }

    setProjectName('');
    if (onProjectCreated) onProjectCreated(project);
  };

  return (
    <div className="container mt-4">
      <h5>Create New Project</h5>
      <form onSubmit={handleCreate}>
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
      {status && <div className="alert alert-info mt-2">{status}</div>}
    </div>
  );
}

export default CreateProjectForm;

