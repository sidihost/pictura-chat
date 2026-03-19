import { NextResponse } from 'next/server';

export interface ElevenLabsTTSPayload {
  text: string;
  voice?: string;
  model_id?: string;
}

// Default ElevenLabs voices (Pictts branded)
const DEFAULT_VOICE = 'EXAVITQu4vr4xnSDxMaL'; // Sarah - clear and professional
const DEFAULT_MODEL = 'eleven_multilingual_v2';

export const POST = async (req: Request) => {
  try {
    const payload = (await req.json()) as ElevenLabsTTSPayload;
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Pictts (ElevenLabs) API key not configured' },
        { status: 500 },
      );
    }

    const voiceId = payload.voice || DEFAULT_VOICE;
    const modelId = payload.model_id || DEFAULT_MODEL;

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        body: JSON.stringify({
          model_id: modelId,
          text: payload.text,
          voice_settings: {
            similarity_boost: 0.75,
            stability: 0.5,
            style: 0,
            use_speaker_boost: true,
          },
        }),
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        method: 'POST',
      },
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('[Pictts] ElevenLabs API error:', error);
      return NextResponse.json(
        { error: 'Failed to generate speech with Pictts' },
        { status: response.status },
      );
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
      status: 200,
    });
  } catch (error) {
    console.error('[Pictts] TTS error:', error);
    return NextResponse.json(
      { error: 'Failed to synthesize speech with Pictts' },
      { status: 500 },
    );
  }
};
