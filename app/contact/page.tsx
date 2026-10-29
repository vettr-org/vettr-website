import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
 return (<div className="inner-page">
<main className="contact-main" id="main" data-theme="dark"><div className="container"><div className="contact-content">
<p className="eyebrow">Tell us all the things...</p><h1>Let’s take this offline.</h1><div className="body-copy"><p>Got a question, feedback, or something you’d rather not leave in a review?<br /> Give us the full story. Or the short version.</p></div>
<ContactForm /></div></div></main>
<SiteFooter inner />
</div>);
}
