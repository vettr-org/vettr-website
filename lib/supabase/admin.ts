import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | undefined;

type JwtClaims = {
  role?: string;
  iss?: string;
  ref?: string;
};

function jwtClaims(key: string): JwtClaims | undefined {
  try {
    const payload = key.split(".")[1];
    if (!payload) return undefined;
    const json = Buffer.from(payload, "base64url").toString("utf8");
    return JSON.parse(json) as JwtClaims;
  } catch {
    return undefined;
  }
}

function projectRefFromUrl(url: string): string | undefined {
  try {
    const host = new URL(url).hostname;
    const match = /^([a-z0-9]+)\.supabase\.co$/i.exec(host);
    return match?.[1];
  } catch {
    return undefined;
  }
}

function assertSecretKey(url: string, secretKey: string) {
  const claims = jwtClaims(secretKey);
  if (!claims) return; // non-JWT secret formats are allowed through

  if (claims.iss === "supabase-demo") {
    throw new Error(
      "SUPABASE_SECRET_KEY is the Supabase docs demo key (iss=supabase-demo), not your project key. " +
        "Copy the service_role secret from Supabase → Project Settings → API Keys for Vettr STAGING.",
    );
  }

  if (claims.role && claims.role !== "service_role") {
    throw new Error(
      `SUPABASE_SECRET_KEY must be the service_role secret, got role "${claims.role}". ` +
        "Copy the secret key from Supabase → Project Settings → API Keys (not the anon/publishable key).",
    );
  }

  const expectedRef = projectRefFromUrl(url);
  if (expectedRef && claims.ref && claims.ref !== expectedRef) {
    throw new Error(
      `SUPABASE_SECRET_KEY is for project "${claims.ref}", but SUPABASE_URL is "${expectedRef}".`,
    );
  }
}

export function createAdminClient(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const secretKey =
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !secretKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SECRET_KEY");
  }

  assertSecretKey(url, secretKey);

  client = createClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return client;
}
