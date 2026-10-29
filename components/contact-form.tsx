"use client";

import Image from "next/image";
import { useRef, useSyncExternalStore, type SubmitEvent } from "react";

export const CONTACT_TOPICS = [
  "General Feedback", "Profile Impersonation", "Profile Removal", "General Question", "Partnership inquiry",
] as const;

export type ContactSubmissionDetail = {
  data: { name: string; email: string; topic: string; message: string };
  form: HTMLFormElement;
  status: HTMLParagraphElement;
};

// Keep submission disabled in server-rendered/no-JS HTML, and enable it on hydration.
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function ContactForm() {
  const ready = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const status = useRef<HTMLParagraphElement>(null);

  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity() || !status.current) return;
    const values = new FormData(form);
    const detail: ContactSubmissionDetail = {
      form, status: status.current,
      data: {
        name: String(values.get("name") ?? ""), email: String(values.get("email") ?? ""),
        topic: String(values.get("topic") ?? ""), message: String(values.get("message") ?? ""),
      },
    };
    // A backend integration can claim the event and manage the supplied status node.
    const unhandled = form.dispatchEvent(new CustomEvent<ContactSubmissionDetail>("workedwith:contact-submit", {
      bubbles: true, cancelable: true, detail,
    }));
    if (unhandled) status.current.textContent = "This preview isn’t connected yet. Your message hasn’t been sent.";
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
      <button className="gradient-button" type="submit" disabled={!ready}>Submit</button>
      <noscript><p>Please enable JavaScript to use this form preview. No message has been sent.</p></noscript>
      <p id="form-status" className="form-status" role="status" aria-live="polite" ref={status} />
    </form>
  );
}
