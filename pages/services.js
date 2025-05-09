import Navbar from '../components/navbar';
import Link from 'next/link';

export default function Services() {
  const services = [
    {
      title: 'Мини багер под наем',
      desc: 'Подходящ за тесни пространства и детайлна работа.',
    },
    {
      title: 'Изкопи за основи',
      desc: 'Прецизни и стабилни основи за всякакъв вид сгради.',
    },
    {
      title: 'Нивелация на терени',
      desc: 'Изравняване на терени за строежи, пътища и други нужди.',
    },
    {
      title: 'Премахване на отпадъци',
      desc: 'Почистване на обекти от строителни и земни отпадъци.',
    },
    {
      title: 'Изкопи за канали и тръбопроводи',
      desc: 'Точна дълбочина и форма според изискванията на клиента.',
    },
  ];

  return (
    <>
      <Navbar />
      <section style={sectionStyle}>
        <h1 style={titleStyle}>Нашите услуги</h1>
        <p style={subtitleStyle}>
          Предлагаме широка гама от багерни услуги, съобразени с нуждите на нашите клиенти. Независимо дали става въпрос за малък частен проект или мащабен строеж, ние сме насреща.
        </p>

        <div style={gridStyle}>
          {services.map((service, idx) => (
            <div key={idx} style={cardStyle}>
              <h3 style={cardTitleStyle}>{service.title}</h3>
              <p style={cardTextStyle}>{service.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/contact">
            <button style={buttonStyle}>Свържете се за оферта</button>
          </Link>
        </div>
      </section>
    </>
  );
}

const sectionStyle = {
  padding: '4rem 2rem',
  backgroundColor: '#111',
  color: '#fff',
  minHeight: '100vh',
};

const titleStyle = {
  textAlign: 'center',
  fontSize: '2.5rem',
  marginBottom: '1rem',
};

const subtitleStyle = {
  textAlign: 'center',
  fontSize: '1.1rem',
  maxWidth: '700px',
  margin: '0 auto 3rem',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '2rem',
  maxWidth: '1100px',
  margin: '0 auto',
};

const cardStyle = {
  backgroundColor: '#222',
  border: '1px solid #f4c10f22',
  padding: '1.5rem',
  borderRadius: '10px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  textAlign: 'center',
};

const cardTitleStyle = {
  color: '#f4c10f',
  marginBottom: '0.5rem',
};

const cardTextStyle = {
  color: '#ddd',
};

const buttonStyle = {
  padding: '0.75rem 1.5rem',
  backgroundColor: '#f4c10f',
  color: '#000',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  fontSize: '1rem',
  cursor: 'pointer',
};
