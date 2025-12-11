import { Articles } from './Articles';
import { ContactForm } from './ContactForm';
import { Hero } from './Hero';
import { Highlights } from './Highlights';
import { ImageSlider } from './ImageSlider';
import { Gallery } from './Gallery';
import { LogoStrip } from './LogoStrip';
import { ServiceGrid } from './ServiceGrid';
import type { SiteContent } from '../../types';

import "./home.css";

export function HomePage(props: {content: SiteContent}) {
    const { content } = props;

    return <main>
        <Hero hero={content.hero} />
        <ServiceGrid />
        <Highlights items={content.highlights} />
        {content.slides ? <ImageSlider slides={content.slides} /> : null}
        <Gallery />
        <LogoStrip />
        <Articles articles={content.articles} />
        <ContactForm />
    </main>
}