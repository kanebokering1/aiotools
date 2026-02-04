import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'AIO Tools - All-in-One Digital Tools Suite';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '60px',
            borderRadius: '30px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{ fontSize: 80, fontWeight: 'bold', marginBottom: 20 }}>
            AIO Tools
          </div>
          <div style={{ fontSize: 40, opacity: 0.9, textAlign: 'center' }}>
            All-in-One Digital Tools Suite
          </div>
          <div
            style={{
              fontSize: 28,
              opacity: 0.8,
              marginTop: 30,
              display: 'flex',
              gap: 20,
            }}
          >
            <span>🎨 Image</span>
            <span>📄 PDF</span>
            <span>🎬 Video</span>
            <span>💻 Developer</span>
          </div>
          <div
            style={{
              fontSize: 24,
              opacity: 0.7,
              marginTop: 40,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: '15px 30px',
              borderRadius: '15px',
            }}
          >
            39 Free Tools • No Registration • 100% Secure
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

