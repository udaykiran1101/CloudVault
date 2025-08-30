
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';

function ProjectSelector({ onProjectSelect, user }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);

    const userId = user.id;
    console.log('👤 User ID:', userId);

    // 1. Get projects created by the user
    const { data: createdProjects, error: error1 } = await supabase
      .from('projects')
      .select('*')
      .eq('created_by', userId);

    if (error1) {
      console.error('❌ Error fetching created projects:', error1.message);
    }

    // 2. Get projects user is a member of
    const { data: memberEntries, error: error2 } = await supabase
      .from('project_members')
      .select('project:project_id(*)')
      .eq('user_id', userId);

    if (error2) {
      console.error('❌ Error fetching member projects:', error2.message);
    }

    const memberProjects = memberEntries?.map((entry) => entry.project) || [];

    // 3. Merge both lists, removing duplicates by ID
    const combined = [
      ...(createdProjects || []),
      ...memberProjects.filter(
        (mp) => !(createdProjects || []).some((cp) => cp.id === mp.id)
      ),
    ];

    setProjects(combined);
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchProjects();
  }, [user]);

  const handleChange = (e) => {
    const selected = projects.find((p) => p.id === e.target.value);
    onProjectSelect(selected);
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="mt-3">
      <label className="form-label">Select Project</label>
      <select className="form-select" onChange={handleChange} defaultValue="">
        <option value="" disabled>
          -- Choose a project --
        </option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProjectSelector;

