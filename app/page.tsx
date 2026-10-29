import Image from "next/image";
import Link from "next/link";
import { PhonePreview } from "@/components/phone-preview";
import { PhraseCycler } from "@/components/phrase-cycler";
import { StoreLinks } from "@/components/store-links";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
 return (<>
<main id="main">
 <section className="hero" data-theme="dark" aria-labelledby="hero-heading"><div className="container">
  <div className="hero-copy"><p className="eyebrow">Good work. Bad coworkers. Real perspectives.</p><h1 id="hero-heading">You’ve got the resumé,<br />they’ve got the stories.</h1>
   <div className="body-copy"><p>The people who know your work best were right there with you.</p><p>Your colleagues, managers, and teammates have seen how you show up, handle the hard stuff,<br /> and make things happen. Their perspective says more than a job title ever could.</p></div><StoreLinks placement="hero" />
  </div>
  <div className="phone-stage" role="img" aria-label="Three previews of the Worked With app, showing a coworker profile and reviews">
   <PhonePreview className="phone-left" /><PhonePreview className="phone-right" /><PhonePreview className="phone-center" />
   <PhraseCycler />

  </div>
 </div></section>
 <section className="why" data-theme="light" aria-labelledby="why-heading"><div className="container">
  <div className="section-heading"><p className="eyebrow">The part that doesn’t fit on LinkedIn</p><h2 id="why-heading">You worked with them. You should be able to talk about it.</h2><div className="body-copy"><p>Leave anonymous reviews of coworkers, past and present. Give credit. Call out the bullshit.</p><p>Share what it was actually like (<em>with your name off the record</em>).</p></div></div>
  <div className="character-grid">
   <article className="character-card"><div className="character-icon"><Image src="/assets/4009b.svg" width={72} height={72} alt="A ghost" unoptimized /></div><h3>All the credit.<br />None of the work.</h3><p>Somehow absent for the project, front and center for the presentation. Funny how that happens.</p></article>
   <article className="character-card"><div className="character-icon"><Image src="/assets/c5141.svg" width={72} height={72} alt="An unimpressed face" unoptimized /></div><h3>A great boss, according to their boss.</h3><p>Managing up is a skill. So is managing the people who actually report to you. Ideally, you’d do both.</p></article>
   <article className="character-card"><div className="character-icon"><Image className="rock-icon" src="/assets/6a82b.svg" width={72} height={73} alt="A rock-on hand" unoptimized /></div><h3>The reason<br />everyone stayed.</h3><p>They untangle the mess, back up their teammates, and make a rough week bearable. They deserve more than a private thank-you.</p></article>
  </div>
 </div></section>
 <section className="hiring" data-theme="dark" aria-labelledby="hiring-heading"><div className="container hiring-grid">
  <div className="hiring-copy"><p className="eyebrow">For the hiring managers</p><h2 id="hiring-heading">Anyone can interview well. Eventually, they have to do the work.</h2><div className="body-copy"><p>The resumé checks out. The interview went great. But what’s it like to share a deadline with them?</p><p>Hear from the people who’ve been on their team—not just the references they handpicked.</p><p>Find out who you’re hiring before you send the offer.</p></div><StoreLinks placement="hiring" /></div>
  <div className="hiring-illustration" role="img" aria-label="Worked With app preview showing a professional profile with colleague reviews"><PhonePreview className="" /></div>
 </div></section>
 <section className="contact-cta" data-theme="light" aria-labelledby="contact-heading"><div className="container"><h2 id="contact-heading">Let’s take this offline...</h2><p>Questions, feedback, partnership ideas? We’d like to hear them.</p><Link className="gradient-button" href="/contact">Contact us</Link></div></section>
</main>
<SiteFooter />
</>);
}
