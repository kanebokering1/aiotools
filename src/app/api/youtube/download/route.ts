import { NextRequest, NextResponse } from 'next/server';
import ytdl from 'ytdl-core';

/**
 * YouTube Download API Route
 * 
 * This API route handles YouTube video downloads using ytdl-core
 * It's completely FREE - no third-party API needed!
 * 
 * Usage:
 * POST /api/youtube/download
 * Body: { videoId: string, format: 'video' | 'audio', quality?: string }
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { videoId, format = 'video', quality = 'highest' } = body;

    if (!videoId) {
      return NextResponse.json(
        { error: 'Video ID is required' },
        { status: 400 }
      );
    }

    // Validate video ID format
    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      return NextResponse.json(
        { error: 'Invalid video ID format' },
        { status: 400 }
      );
    }

    // Validate YouTube URL
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const isValid = await ytdl.validateURL(videoUrl);
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL or video not available' },
        { status: 400 }
      );
    }

    // Get video info
    const info = await ytdl.getInfo(videoId);
    
    if (format === 'audio') {
      // Get audio format
      const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
      const bestAudio = audioFormats[0] || audioFormats.find(f => f.audioBitrate === 128) || audioFormats.find(f => f.audioBitrate === 64);
      
      if (!bestAudio) {
        return NextResponse.json(
          { error: 'No audio format available' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        downloadUrl: bestAudio.url,
        format: 'audio',
        quality: `${bestAudio.audioBitrate}kbps`,
        title: info.videoDetails.title,
        duration: info.videoDetails.lengthSeconds,
        thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1]?.url
      });
    } else {
      // Get video format
      let videoFormat;
      
      if (quality === '1080p') {
        videoFormat = ytdl.chooseFormat(info.formats, { quality: '137' }); // 1080p
      } else if (quality === '720p') {
        videoFormat = ytdl.chooseFormat(info.formats, { quality: '136' }); // 720p
      } else if (quality === '480p') {
        videoFormat = ytdl.chooseFormat(info.formats, { quality: '135' }); // 480p
      } else {
        videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });
      }

      if (!videoFormat) {
        return NextResponse.json(
          { error: 'No video format available for selected quality' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        downloadUrl: videoFormat.url,
        format: 'video',
        quality: quality,
        title: info.videoDetails.title,
        duration: info.videoDetails.lengthSeconds,
        thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1]?.url
      });
    }

  } catch (error: any) {
    console.error('YouTube download error:', error);
    
    // Handle specific errors
    if (error.message?.includes('Sign in to confirm your age')) {
      return NextResponse.json(
        { error: 'This video is age-restricted and cannot be downloaded' },
        { status: 403 }
      );
    }
    
    if (error.message?.includes('Video unavailable') || error.message?.includes('410')) {
      return NextResponse.json(
        { error: 'Video is unavailable, has been removed, or YouTube is blocking access. Please try again later or use a different video.' },
        { status: 404 }
      );
    }

    // Handle 410 Gone error specifically
    if (error.status === 410 || error.statusCode === 410 || error.message?.includes('410')) {
      return NextResponse.json(
        { error: 'YouTube returned error 410 (Gone). This video may be unavailable or YouTube has changed their API. Please try a different video or check back later.' },
        { status: 410 }
      );
    }

    // Handle ytdl-core specific errors
    if (error.message?.includes('Status code: 410')) {
      return NextResponse.json(
        { error: 'YouTube is currently blocking access to this video (Error 410). This is a temporary issue. Please try again later or use a different video.' },
        { status: 410 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to process download request. Please try again later.' },
      { status: 500 }
    );
  }
}

// GET method to get video info only
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const videoId = searchParams.get('videoId');

    if (!videoId) {
      return NextResponse.json(
        { error: 'Video ID is required' },
        { status: 400 }
      );
    }

    // Validate video ID format
    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      return NextResponse.json(
        { error: 'Invalid video ID format' },
        { status: 400 }
      );
    }

    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    
    // Try ytdl-core first
    let info;
    let useFallback = false;
    
    try {
      const isValid = await ytdl.validateURL(videoUrl);
      
      if (!isValid) {
        throw new Error('Invalid YouTube URL');
      }

      info = await ytdl.getInfo(videoId);
    } catch (ytdlError: any) {
      console.warn('ytdl-core failed, using oEmbed fallback:', ytdlError.message);
      
      // Fallback to oEmbed API if ytdl-core fails (especially for 410 errors)
      try {
        const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`;
        const oEmbedResponse = await fetch(oEmbedUrl);
        
        if (!oEmbedResponse.ok) {
          throw new Error(`oEmbed API returned ${oEmbedResponse.status}`);
        }
        
        const oEmbedData = await oEmbedResponse.json();
        useFallback = true;
        
        // Return oEmbed data in similar format
        return NextResponse.json({
          success: true,
          videoId: videoId,
          title: oEmbedData.title,
          author: oEmbedData.author_name,
          duration: 0, // oEmbed doesn't provide duration
          views: "N/A", // oEmbed doesn't provide views
          thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          description: "",
          availableFormats: {
            video: [],
            audio: []
          },
          fallback: true,
          message: "Using oEmbed API (limited info). Download may not be available due to YouTube restrictions."
        });
      } catch (oEmbedError: any) {
        // If both fail, throw the original ytdl error
        throw ytdlError;
      }
    }
    
    // Get available formats
    const videoFormats = ytdl.filterFormats(info.formats, 'video');
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

    return NextResponse.json({
      success: true,
      videoId: videoId,
      title: info.videoDetails.title,
      author: info.videoDetails.author.name,
      duration: parseInt(info.videoDetails.lengthSeconds),
      views: info.videoDetails.viewCount,
      thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1]?.url,
      description: info.videoDetails.description,
      availableFormats: {
        video: videoFormats.map(f => ({
          quality: f.qualityLabel || f.quality,
          itag: f.itag,
          container: f.container
        })),
        audio: audioFormats.map(f => ({
          bitrate: f.audioBitrate,
          itag: f.itag,
          container: f.container
        }))
      }
    });

  } catch (error: any) {
    console.error('YouTube info error:', error);
    
    // Handle 410 Gone error
    if (error.status === 410 || error.statusCode === 410 || error.message?.includes('410') || error.message?.includes('Status code: 410')) {
      return NextResponse.json(
        { error: 'YouTube returned error 410 (Gone). This video may be unavailable or YouTube has changed their API. Please try a different video or check back later.' },
        { status: 410 }
      );
    }

    // Handle video unavailable
    if (error.message?.includes('Video unavailable') || error.message?.includes('Sign in to confirm your age')) {
      return NextResponse.json(
        { error: error.message || 'Video is unavailable or age-restricted' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to get video information. Please try again later.' },
      { status: 500 }
    );
  }
}

