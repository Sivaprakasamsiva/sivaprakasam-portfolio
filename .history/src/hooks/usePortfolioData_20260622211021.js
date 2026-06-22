import { useState, useEffect } from 'react';

const API_BASE = '/data';

export const usePortfolioData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    profile: null,
    experience: null,
    projects: null,
    education: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileRes, experienceRes, projectsRes, educationRes] = await Promise.all([
          fetch(`${API_BASE}/profile.json`),
          fetch(`${API_BASE}/experience.json`),
          fetch(`${API_BASE}/projects.json`),
          fetch(`${API_BASE}/education.json`),
        ]);

        if (!profileRes.ok || !experienceRes.ok || !projectsRes.ok || !educationRes.ok) {
          throw new Error('Failed to fetch one or more data files');
        }

        const [profile, experience, projects, education] = await Promise.all([
          profileRes.json(),
          experienceRes.json(),
          projectsRes.json(),
          educationRes.json(),
        ]);

        setData({ profile, experience, projects, education });
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load portfolio data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { ...data, loading, error };
};

export default usePortfolioData;