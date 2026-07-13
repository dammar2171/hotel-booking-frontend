import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { fadeUp } from '../animations/motions';

interface CtaCardProps {
  title: string;
  description: string;
}

function CtaCard({ ctaData }: { ctaData: CtaCardProps }) {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
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

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="btn btn-light mt-3 px-4"
        onClick={() => navigate('/rooms')}
      >
        Browse Rooms
      </motion.button>
    </motion.div>
  );
}

export default CtaCard;
