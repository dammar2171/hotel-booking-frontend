import React from 'react';
import { useNavigate } from 'react-router';
interface CtaCardProps {
  title: string;
  description: string;
}
function CtaCard({ ctaData }: { ctaData: CtaCardProps }) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        background: 'var(--color-accent)',
        borderRadius: 'var(--radius-xl)',
        padding: '70px 20px',
        textAlign: 'center',
      }}
    >
      <h2
        style={{
          color: 'var(--color-accent-text)',
        }}
      >
        {ctaData.title}
      </h2>

      <p
        style={{
          color: 'rgba(255,255,255,.85)',
        }}
      >
        {ctaData.description}
      </p>

      <button
        className="btn btn-light mt-3 px-4"
        onClick={() => navigate('/rooms')}
      >
        Browse Rooms
      </button>
    </div>
  );
}

export default CtaCard;
