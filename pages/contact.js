// pages/Contact.js
import Head from 'next/head';
import dynamic from 'next/dynamic';

const ContactForm = dynamic(() => import('../components/ContactForm'), {
  ssr: false,
});

export default function Contact() {
  return (
    <div>
      <Head>
        <title>Свържете се с нас</title>
      </Head>
      <ContactForm />
    </div>
  );
}
