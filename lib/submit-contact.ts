export type ContactSubmitResult =
  | { ok: true }
  | { ok: false; error: string };

const GENERIC_ERROR = "Something went wrong. Please try again.";

function fail(error: string): ContactSubmitResult {
  return { ok: false, error };
}

export async function submitContact(formData: FormData): Promise<ContactSubmitResult> {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!baseUrl) {
    return fail(GENERIC_ERROR);
  }

  const payload = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    topic: String(formData.get("topic") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  try {
    const response = await fetch(`${baseUrl}/functions/v1/submit-contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let result: ContactSubmitResult | undefined;
    try {
      result = (await response.json()) as ContactSubmitResult;
    } catch {
      return fail(GENERIC_ERROR);
    }

    if (
      result &&
      typeof result === "object" &&
      "ok" in result &&
      (result.ok === true || (result.ok === false && typeof result.error === "string"))
    ) {
      return result;
    }

    return fail(GENERIC_ERROR);
  } catch {
    return fail(GENERIC_ERROR);
  }
}
