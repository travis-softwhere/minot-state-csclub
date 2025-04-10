'use client';

import { useState, useEffect } from 'react';

type Candidate = {
  id: number;
  name: string;
  email: string;
  positions: string;
  statement: string;
  image_data: string;
};

export default function CandidatesList() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const positions = ['President', 'Vice President', 'Treasurer', 'Secretary', 'Communications Director'];

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch('/api/candidates');
        if (!response.ok) {
          throw new Error('Failed to fetch candidates');
        }
        const data = await response.json();
        setCandidates(data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
        setError('Failed to load candidates');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const filteredCandidates = selectedPosition === 'all'
    ? candidates
    : candidates.filter(candidate => candidate.positions.includes(selectedPosition));

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-gray-600">Loading candidates...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Election Candidates</h2>
      
      {/* Position filter buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedPosition('all')}
          className={`px-4 py-2 rounded-md ${
            selectedPosition === 'all'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Positions
        </button>
        {positions.map((position) => (
          <button
            key={position}
            onClick={() => setSelectedPosition(position)}
            className={`px-4 py-2 rounded-md ${
              selectedPosition === position
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {position}
          </button>
        ))}
      </div>

      {/* Candidates grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={candidate.image_data}
                alt={`${candidate.name}'s profile`}
                className="w-24 h-24 rounded-full object-cover border-2 border-red-500"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
                <p className="text-sm text-gray-500">{candidate.email}</p>
              </div>
            </div>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-1">Running for:</h4>
              <div className="flex flex-wrap gap-1">
                {candidate.positions.split(',').map((position) => (
                  <span
                    key={position}
                    className="inline-block bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full"
                  >
                    {position.trim()}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Statement:</h4>
              <p className="text-gray-600 text-sm">{candidate.statement}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No candidates found for {selectedPosition === 'all' ? 'any position' : selectedPosition}.
        </p>
      )}
    </div>
  );
} 