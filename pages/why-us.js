import Navbar from '../components/navbar';

export default function WhyUs() {
  return (
    <>
      <Navbar />
      <section style={{ padding: '4rem 2rem', maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Защо да изберете нас?</h1>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          Ние сме екип с богат опит и страст към земните и строителни работи. Нашата мисия е да предоставим
          качествени услуги с внимание към детайла, безопасност и удовлетвореност на клиента. Работим с модерна техника
          и предлагаме индивидуален подход към всеки проект.
        </p>
      </section>
    </>
  );
}
