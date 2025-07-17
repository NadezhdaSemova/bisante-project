import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../../styles/contact.css';
const Contact = () => {

 
  return (
    <main>
      <h1>Свържете се с нас</h1>

      <div className="contact-info">
        <p>
          <FontAwesomeIcon icon={faMapMarkerAlt} /> <strong>Адрес:  </strong> 6450 гр. Харманли, ул "Колю Фичето" №4
        </p>
        <p>
          <FontAwesomeIcon icon={faPhone} /> <strong>Телефон:</strong> +359 893 767 600
        </p>
        <p>
          <FontAwesomeIcon icon={faEnvelope} /> <strong>Имейл:</strong> bisante@abv.bg
        </p>
        {/* <p>
          <FontAwesomeIcon icon={faClock} /> <strong>Работно време:</strong> Пон - Пет: 9:00 - 18:00
        </p> */}
      </div>
       <div className="map-container">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.791993938687!2d25.929693475471627!3d41.91883006286394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b2b3907eee09a3%3A0x1692bed4ddb668d5!2z0YPQuy4gItCa0L7Qu9GOINCk0LjRh9C10YLQviIgNCwgNjQ1MCDQpdCw0YDQvNCw0L3Qu9C4!5e0!3m2!1sbg!2sbg!4v1752573772991!5m2!1sbg!2sbg"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </main>
  );
};
export default Contact;
