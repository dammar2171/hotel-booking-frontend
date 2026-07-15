import { motion } from 'framer-motion';
import { fadeUp } from '../animations/motions';
interface HeroSectionProps {
  title: string;
  heading: string;
  description: string;
}
function HeroSection({ dataHero }: { dataHero: HeroSectionProps }) {
  return (
    <motion.section
      style={{
        padding: '90px 0',
        background: 'var(--color-bg-primary)',
        borderBottom: '1px solid var(--color-border)',
      }}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container text-center">
        <div
          style={{
            display: 'inline-block',
            background: 'var(--color-accent-light)',
            color: 'var(--color-accent)',
            padding: '6px 18px',
            borderRadius: '999px',
            fontWeight: 600,
            marginBottom: 20,
          }}
        >
          {dataHero.title}
        </div>

        <h1
          style={{
            color: 'var(--color-text-primary)',
            fontWeight: 800,
          }}
        >
          {dataHero.heading}
        </h1>

        <p
          className="mx-auto mt-3"
          style={{
            maxWidth: 700,
            color: 'var(--color-text-muted)',
            fontSize: 'var(--text-lg)',
          }}
        >
          {dataHero.description}
        </p>
      </div>
    </motion.section>
  );
}

export default HeroSection;
