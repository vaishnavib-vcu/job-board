import { NextResponse } from "next/server";
import axios from "axios";
import https from "https";

// Ensure this route always runs on the server
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Force IPv4 to avoid WebRTC / AWS IPv6 routing issues
const httpsAgent = new https.Agent({
  family: 4,
  keepAlive: true,
});

export async function POST() {
  console.log("🚀 INITIATING NOVA AI SESSION");

  const apiKey = process.env.TAVUS_API_KEY;
  const personaId = process.env.TAVUS_PERSONA_ID;

  // Validate environment variables
  if (!apiKey || !personaId) {
    console.error("❌ Missing TAVUS_API_KEY or TAVUS_PERSONA_ID");
    return NextResponse.json(
      { error: "Server misconfiguration: API keys not found." },
      { status: 500 }
    );
  }

  try {
    const response = await axios.post(
      "https://api.tavus.video/v2/conversations",
      {
        persona_id: personaId,
        conversation_name: "JobNova Mock Interview",
        custom_greeting:
          "Hello! I am Nova, your AI career coach. I've reviewed the job requirements and I'm ready to start our mock interview whenever you are.",
        properties: {
          max_duration: 600, // 10 minutes
          enable_recording: false,
          allow_overtime: false,
        },
      },
      {
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
        timeout: 25000,
        httpsAgent, // 👈 Critical fix
      }
    );

    console.log(
      "✅ Tavus conversation created:",
      response.data.conversation_id
    );

    return NextResponse.json({
      token: response.data.token ?? response.data.conversation_id,
      url: response.data.conversation_url,
    });
  } catch (error: any) {
    // Tavus returned an error response
    if (axios.isAxiosError(error) && error.response) {
      console.error("❌ TAVUS API ERROR:", error.response.data);
      return NextResponse.json(
        {
          error:
            error.response.data?.message ??
            "Tavus API rejected the request.",
        },
        { status: error.response.status }
      );
    }

    // Network / Firewall / ISP block
    if (axios.isAxiosError(error) && error.request) {
      console.error(
        "🚫 NETWORK FAILURE: Tavus unreachable (Firewall / ISP / IPv6 issue)"
      );
      return NextResponse.json(
        {
          error:
            "Network Error: Tavus servers unreachable. Please check your internet or try a mobile hotspot.",
        },
        { status: 503 }
      );
    }

    // Unexpected server error
    console.error("🔥 INTERNAL SERVER ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error while initializing Nova AI." },
      { status: 500 }
    );
  }
}
