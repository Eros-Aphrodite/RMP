// Supabase Edge Function to send emails
// This function uses Resend API to send emails
// Setup: Install Resend API key in Supabase secrets

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const RESEND_FROM_EMAIL = Deno.env.get("RESEND_FROM_EMAIL") || "noreply@retailmarketingpro.com";

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  text: string;
  from?: string;
}

serve(async (req) => {
  try {
    // Handle CORS
    if (req.method === "OPTIONS") {
      return new Response("ok", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
        },
      });
    }

    const { to, subject, html, text, from } = await req.json() as EmailRequest;

    if (!to || !subject || !html) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: to, subject, html" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        }
      );
    }

    // If Resend API key is configured, use Resend
    if (RESEND_API_KEY) {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: from || RESEND_FROM_EMAIL,
          to: [to],
          subject: subject,
          html: html,
          text: text,
        }),
      });

      if (resendResponse.ok) {
        const data = await resendResponse.json();
        return new Response(
          JSON.stringify({ success: true, messageId: data.id }),
          {
            status: 200,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
          }
        );
      } else {
        const error = await resendResponse.text();
        console.error("Resend API error:", error);
      }
    }

    // Fallback: Log to Supabase database for manual processing
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    await supabase.from("settings").insert({
      id: `email_${Date.now()}`,
      data: {
        type: "email_notification",
        to: to,
        subject: subject,
        html: html,
        text: text,
        status: "pending",
        createdAt: new Date().toISOString(),
      },
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email queued for processing (Resend not configured)" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      }
    );
  } catch (error) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      }
    );
  }
});

