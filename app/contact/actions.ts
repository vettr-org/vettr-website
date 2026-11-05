"use server";

import { isContactTopic } from "@/lib/contact";
import { createAdminClient } from "@/lib/supabase/admin";

export type ContactSubmitResult =
  | { ok: true }
  | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fail(error: string): ContactSubmitResult {
  return { ok: false, error };
}

export async function submitContact(formData: FormData): Promise<ContactSubmitResult> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const topic = String(formData.get("topic") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (name.length < 1 || name.length > 150) {
    return fail("Please enter a valid name.");
  }

  if (email.length < 3 || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return fail("Please enter a valid email address.");
  }

  if (!isContactTopic(topic)) {
    return fail("Please choose a topic.");
  }

  if (message.length < 1 || message.length > 10000) {
    return fail("Please enter a message.");
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("contact_submissions").insert({
      name,
      email,
      topic,
      message,
    });

    if (error) {
      console.error("[contact] insert failed", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      return fail("Something went wrong. Please try again.");
    }

    return { ok: true };
  } catch (error) {
    console.error("[contact] unexpected failure", error);
    return fail("Something went wrong. Please try again.");
  }
}
