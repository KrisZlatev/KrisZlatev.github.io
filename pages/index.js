// pages/index.js
import Link from 'next/link';
import Navbar from '../components/navbar';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.heroContainer}>
        {/* Background Video */}
        <video
          className={styles.heroVideo}
          autoPlay
          loop
          muted
          playsInline
          poster="/gifs/excavator-loop.gif"
        >
          <source src="/videos/excavator-loop.webm" type="video/webm" />
          <source src="/videos/excavator-loop.mp4" type="video/mp4" />
        </video>

        {/* Black Gradient Overlay */}
        <div className={styles.overlay}></div>

        {/* Hero Content */}
        <section className={styles.heroContent}>
          <h1>Професионални услуги с багер за всякакви нужди</h1>
          <h2>Вашият надежден партньор за земни и строителни работи</h2>
          <div className={styles.ctaButtons}>
            <Link href="/services">
              <button className={styles.primaryButton}>Виж услуги</button>
            </Link>
            <Link href="/contact">
              <button className={styles.secondaryButton}>Свържете се с нас</button>
            </Link>
          </div>
        </section>
      </div>

      {/* Services Preview Section */}
      <section className={styles.servicesPreview}>
        <h2 className={styles.servicesTitle}>Нашите услуги</h2>
        <div className={styles.servicesGrid}>
          {[
            {
              title: "Мини багер под наем",
              desc: "Идеален за тесни пространства и точна работа в ограничени условия."
            },
            {
              title: "Изкопи за основи",
              desc: "Извършваме качествени и прецизни изкопи за основи на сгради."
            },
            {
              title: "Нивелация на терени",
              desc: "Подготвяме терени за строителство и инфраструктурни проекти."
            },
            {
              title: "Изкопи за канали и тръбопроводи",
              desc: "Специализирани услуги за водопроводни, дренажни и канализационни системи."
            }
          ].map((service, index) => (
            <div key={index} className={styles.serviceCard}>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
