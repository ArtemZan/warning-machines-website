const services = [
  {
    id: 'pcb',
    title: 'PCB',
    image: 'PCB.jpg'
  },
  {
    id: 'CAD',
    title: 'CAD/CAM',
    image: 'CAD-CAM.jpg'
  },
  {
    id: 'firmware',
    title: 'Firmware',
    image: 'firmware.jpg'
  },
  {
    id: 'machinery',
    title: 'Industrial Equipment and Machinery',
    image: 'machinery.png'
  },
  {
    id: 'hardware',
    title: 'Automotive and Mobility',
    image: 'automotive.jpg'
  },
  {
    id: 'electronics',
    title: 'Electronics and Smart Device',
    image: 'smart-device.jpg'
  },
];

export function ServiceGrid() {
  return (
    <section className="section section--primary" id="services">
      <div className="section__header">
        <p className="eyebrow">Services</p>
        <h2>Integrated Hardware Development Services</h2>
        <p className="section__lede">
        From initial concept validation to scalable production, our in-house capabilities and expert team transform your innovative ideas into high-quality physical products quickly and efficiently.
        </p>
      </div>
      <div className="grid grid--services">
        {services.map((service) => (
          <article key={service.id} className="card card--service">
            <h3>{service.title}</h3>
            {service.image && <img src={`/images/services/${service.image}`} alt={service.title} />}
          </article>
        ))}
      </div>
    </section>
  );
}

