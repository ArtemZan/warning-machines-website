const images = [
  { id: 'img1', src: '/images/slide1.png', caption: 'Fast Tooling' },
  { id: 'img2', src: '/images/slide2.png', caption: 'Rapid Fixtures' },
  { id: 'img3', src: '/images/hero.jpg', caption: 'Integrated Hardware' },
  { id: 'img4', src: '/images/abstract-band.jpg', caption: 'Industrial Design' },
  { id: 'img5', src: '/images/slide1.png', caption: 'Prototyping' },
  { id: 'img6', src: '/images/slide2.png', caption: 'Validation' },
];

export function Gallery() {
  return (
    <section className="section section--gallery">
      <div className="section__header">
        <p className="eyebrow">Portfolio</p>
        <h2>Production of quality prototypes</h2>
      </div>
      <div className="gallery">
        {images.map((item) => (
          <figure key={item.id} className="gallery__item" style={{ backgroundImage: `url(${item.src})` }}>
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

