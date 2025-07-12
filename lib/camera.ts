export interface CameraStream {
  stream: MediaStream | null;
  error: string | null;
}

export async function initializeCamera(): Promise<CameraStream> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 640 },
        height: { ideal: 480 },
      },
    });
    return { stream, error: null };
  } catch (error) {
    return {
      stream: null,
      error: error instanceof Error ? error.message : "Unknown camera error",
    };
  }
}

export function stopCamera(stream: MediaStream | null): void {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
}
