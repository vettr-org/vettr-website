"use client";

import Image from "next/image";
import { useRef, useState, useSyncExternalStore, type SubmitEvent } from "react";
import { CONTACT_TOPICS } from "@/lib/contact";
import { submitContact } from "@/lib/submit-contact";

export { CONTACT_TOPICS };

// Keep submission disabled in server-rendered/no-JS HTML, and enable it on hydration.
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function ContactForm() {
  const ready = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const status = useRef<HTMLParagraphElement>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity() || !status.current || pending) return;

    setPending(true);
    status.current.textContent = "Sending…";

    try {
      const result = await submitContact(new FormData(form));
      if (result.ok) {
        form.reset();
        status.current.textContent = "Thanks — your message has been sent.";
      } else {
        status.current.textContent = result.error;
      }
    } catch {
      status.current.textContent = "Something went wrong. Please try again.";
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="contact-form" id="contact-form" method="post" onSubmit={submit}>
      <label><span className="sr-only">Name</span><input name="name" placeholder="Name" autoComplete="name" required maxLength={150} /></label>
      <label><span className="sr-only">Email address</span><input type="email" name="email" placeholder="Email address" autoComplete="email" required maxLength={254} /></label>
      <label className="select-wrap">
        <span className="sr-only">What’s the topic?</span>
        <select name="topic" required defaultValue="">
          <option value="" disabled>What’s the topic?</option>
          {CONTACT_TOPICS.map(topic => <option key={topic}>{topic}</option>)}
        </select>
        <Image className="select-chevron" src="/assets/cbe52.svg" width={10} height={18} alt="" unoptimized />
      </label>
      <label><span className="sr-only">What’s on your mind?</span><textarea name="message" placeholder="What’s on your mind?" required maxLength={10000} /></label>
      <button className="gradient-button" type="submit" disabled={!ready || pending}>Submit</button>
      <noscript><p>Please enable JavaScript to use this form. No message has been sent.</p></noscript>
      <p id="form-status" className="form-status" role="status" aria-live="polite" ref={status} />
    </form>
  );
}
