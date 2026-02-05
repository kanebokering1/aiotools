import { Metadata } from "next";
import { tools } from "@/data/tools";

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
}

// Generate SEO metadata for each tool
export function generateToolMetadata(toolId: string): Metadata {
  const tool = tools.find((t) => t.id === toolId);
  
  if (!tool) {
    return {
      title: "Tool Not Found - AIO Tools",
      description: "The requested tool could not be found.",
    };
  }

  const seoData = toolSEOData[toolId] || {
    title: `${tool.name} - Free Online Tool | AIO Tools`,
    description: tool.description,
    keywords: tool.tags,
    ogTitle: `${tool.name} - AIO Tools`,
    ogDescription: tool.description,
  };

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords.join(", "),
    authors: [{ name: "AIO Tools" }],
    creator: "ArthaCode Studio",
    publisher: "AIO Tools by ArthaCode Studio",
    openGraph: {
      title: seoData.ogTitle,
      description: seoData.ogDescription,
      url: `https://aiotools.arthacodestudio.com${tool.href}`,
      siteName: "AIO Tools",
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: seoData.ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.ogTitle,
      description: seoData.ogDescription,
      images: ["/opengraph-image"],
    },
    alternates: {
      canonical: `https://aiotools.arthacodestudio.com${tool.href}`,
    },
  };
}

// SEO data for each tool
export const toolSEOData: Record<string, SEOData> = {
  // IMAGE TOOLS
  "image-compressor": {
    title: "Image Compressor Online Free - Reduce Image Size Up to 80% | AIO Tools",
    description: "Compress images online for free without losing quality. Reduce JPG, PNG, WebP file sizes by up to 80%. Fast, secure, and no watermark. Perfect for web optimization.",
    keywords: ["image compressor", "compress image online", "reduce image size", "image optimizer", "compress jpg", "compress png", "reduce image file size", "image compression tool"],
    ogTitle: "Free Image Compressor - Reduce Image Size Online",
    ogDescription: "Compress images up to 80% smaller without quality loss. Support JPG, PNG, WebP. Free, fast & secure.",
  },
  "background-remover": {
    title: "Background Remover - Remove Image Background Free Online | AIO Tools",
    description: "Remove background from images instantly for free. AI-powered background removal tool. Perfect for product photos, portraits, and graphics. No signup required.",
    keywords: ["remove background", "background remover", "transparent background", "remove bg", "cut out image", "background eraser", "remove photo background", "png maker"],
    ogTitle: "Free Background Remover - AI-Powered Background Removal",
    ogDescription: "Remove image backgrounds instantly with AI. Free, accurate, and easy to use. No signup needed.",
  },

  // VIDEO TOOLS
  "youtube-downloader": {
    title: "YouTube Downloader - Download YouTube Videos & MP3 Free | AIO Tools",
    description: "Download YouTube videos in MP4, MP3, and various qualities. Free YouTube video downloader with no limits. Convert YouTube to MP3 or download HD videos instantly.",
    keywords: ["youtube downloader", "download youtube video", "youtube to mp3", "youtube to mp4", "youtube video download", "yt downloader", "save youtube video", "youtube converter"],
    ogTitle: "Free YouTube Downloader - Download Videos & Audio",
    ogDescription: "Download YouTube videos in MP4/MP3 format. High quality, fast, and completely free.",
  },
  "tiktok-downloader": {
    title: "TikTok Downloader - Download TikTok Videos Without Watermark | AIO Tools",
    description: "Download TikTok videos without watermark for free. Save TikTok videos in HD quality. Fast, easy, and no login required. Works on all devices.",
    keywords: ["tiktok downloader", "download tiktok video", "tiktok no watermark", "save tiktok video", "tiktok video download", "tiktok saver", "download tiktok", "tiktok mp4"],
    ogTitle: "Free TikTok Downloader - No Watermark",
    ogDescription: "Download TikTok videos without watermark in HD. Fast, free, and easy to use.",
  },
  "instagram-downloader": {
    title: "Instagram Downloader - Download Instagram Photos & Videos | AIO Tools",
    description: "Download Instagram photos, videos, reels, and IGTV for free. Save Instagram content in high quality. No app installation required.",
    keywords: ["instagram downloader", "download instagram video", "download instagram photo", "instagram reels download", "save instagram video", "ig downloader", "instagram saver"],
    ogTitle: "Free Instagram Downloader - Photos, Videos & Reels",
    ogDescription: "Download Instagram photos and videos in high quality. Free and easy to use.",
  },
  "video-converter": {
    title: "Video Converter Online Free - Convert Video to MP4, AVI, MOV | AIO Tools",
    description: "Convert videos to MP4, AVI, MOV, and more formats online for free. Fast video conversion with high quality output. Support all major video formats.",
    keywords: ["video converter", "convert video", "video format converter", "mp4 converter", "avi converter", "video to mp4", "convert video online", "video file converter"],
    ogTitle: "Free Video Converter - Convert Videos to Any Format",
    ogDescription: "Convert videos between MP4, AVI, MOV, and other formats. Fast and free online conversion.",
  },

  // PDF TOOLS
  "pdf-merge": {
    title: "Merge PDF Online Free - Combine PDF Files into One | AIO Tools",
    description: "Merge multiple PDF files into one document online for free. Combine PDF files quickly and easily. No file size limits, secure processing, and no watermark.",
    keywords: ["merge pdf", "combine pdf", "join pdf", "pdf merger", "merge pdf online", "combine pdf files", "pdf joiner", "unite pdf"],
    ogTitle: "Free PDF Merger - Combine Multiple PDFs into One",
    ogDescription: "Merge PDF files online for free. Fast, secure, and no file limits. No watermark added.",
  },
  "pdf-split": {
    title: "Split PDF Online Free - Extract Pages from PDF | AIO Tools",
    description: "Split PDF files into separate pages or extract specific pages online for free. Easy PDF splitter tool with no file size limits. Secure and fast processing.",
    keywords: ["split pdf", "pdf splitter", "extract pdf pages", "divide pdf", "separate pdf", "split pdf online", "pdf page extractor", "break pdf"],
    ogTitle: "Free PDF Splitter - Extract & Separate PDF Pages",
    ogDescription: "Split PDF into separate pages or extract specific pages. Free, fast, and secure.",
  },
  "pdf-compress": {
    title: "Compress PDF Online Free - Reduce PDF File Size | AIO Tools",
    description: "Compress PDF files online to reduce file size while maintaining quality. Free PDF compressor with fast processing. Reduce PDF size up to 90%.",
    keywords: ["compress pdf", "pdf compressor", "reduce pdf size", "compress pdf online", "shrink pdf", "pdf size reducer", "minimize pdf", "pdf optimizer"],
    ogTitle: "Free PDF Compressor - Reduce PDF File Size",
    ogDescription: "Compress PDF files up to 90% smaller. Fast, free, and maintain quality.",
  },
  "pdf-to-image": {
    title: "PDF to Image Converter - Convert PDF to JPG, PNG Free | AIO Tools",
    description: "Convert PDF pages to images (JPG, PNG) online for free. Extract all pages or specific pages from PDF. High-quality image output.",
    keywords: ["pdf to image", "pdf to jpg", "pdf to png", "convert pdf to image", "pdf to image converter", "extract images from pdf", "pdf to picture"],
    ogTitle: "Free PDF to Image Converter - PDF to JPG/PNG",
    ogDescription: "Convert PDF to images in JPG or PNG format. High quality and free.",
  },

  // TEXT TOOLS
  "word-counter": {
    title: "Word Counter - Count Words, Characters & Sentences Online | AIO Tools",
    description: "Free online word counter tool. Count words, characters, sentences, and paragraphs instantly. Perfect for essays, articles, and SEO content. Real-time counting.",
    keywords: ["word counter", "character counter", "count words", "word count tool", "character count", "text counter", "paragraph counter", "sentence counter"],
    ogTitle: "Free Word Counter - Count Words & Characters Online",
    ogDescription: "Count words, characters, sentences instantly. Free and accurate word counting tool.",
  },
  "text-case-converter": {
    title: "Text Case Converter - Convert to Uppercase, Lowercase, Title Case | AIO Tools",
    description: "Convert text to uppercase, lowercase, title case, sentence case, and more. Free online text case converter tool. Instant text transformation.",
    keywords: ["text case converter", "uppercase converter", "lowercase converter", "title case", "sentence case", "convert text case", "text transformer", "case changer"],
    ogTitle: "Free Text Case Converter - Change Text Case Online",
    ogDescription: "Convert text to uppercase, lowercase, title case instantly. Free and easy to use.",
  },
  "qr-code-generator": {
    title: "QR Code Generator Free - Create QR Codes Online | AIO Tools",
    description: "Generate QR codes for free. Create QR codes for URLs, text, phone numbers, emails, and more. Download high-resolution QR codes. No signup required.",
    keywords: ["qr code generator", "create qr code", "qr code maker", "generate qr code", "qr code creator", "free qr code", "qr code online", "qr generator"],
    ogTitle: "Free QR Code Generator - Create QR Codes Instantly",
    ogDescription: "Generate custom QR codes for URLs, text, and more. Free and high quality.",
  },
  "password-generator": {
    title: "Password Generator - Create Strong Random Passwords Online | AIO Tools",
    description: "Generate strong, random passwords online for free. Create secure passwords with custom length and characters. Password strength checker included.",
    keywords: ["password generator", "random password", "strong password generator", "secure password", "password creator", "generate password", "password maker", "random password generator"],
    ogTitle: "Free Password Generator - Create Strong Passwords",
    ogDescription: "Generate strong, secure passwords instantly. Customizable length and character types.",
  },

  // DEVELOPER TOOLS
  "json-formatter": {
    title: "JSON Formatter - Format, Beautify & Validate JSON Online | AIO Tools",
    description: "Format and beautify JSON code online for free. Validate JSON syntax, minify, and prettify JSON data. Perfect for developers and API testing.",
    keywords: ["json formatter", "json beautifier", "json validator", "format json", "prettify json", "json parser", "json viewer", "json minifier"],
    ogTitle: "Free JSON Formatter - Beautify & Validate JSON",
    ogDescription: "Format, validate, and beautify JSON code online. Free and developer-friendly.",
  },
  "html-encoder": {
    title: "HTML Encoder/Decoder - Encode & Decode HTML Entities | AIO Tools",
    description: "Encode and decode HTML entities online for free. Convert special characters to HTML entities and vice versa. Perfect for web developers.",
    keywords: ["html encoder", "html decoder", "html entities", "encode html", "decode html", "html escape", "html unescape", "html entity converter"],
    ogTitle: "Free HTML Encoder/Decoder - Convert HTML Entities",
    ogDescription: "Encode and decode HTML entities online. Fast, free, and developer-friendly.",
  },
  "base64-encoder": {
    title: "Base64 Encoder/Decoder - Encode & Decode Base64 Online | AIO Tools",
    description: "Encode and decode Base64 strings online for free. Convert text, images, and files to Base64 format. Secure and fast processing.",
    keywords: ["base64 encoder", "base64 decoder", "encode base64", "decode base64", "base64 converter", "base64 tool", "base64 online", "base64 encode online"],
    ogTitle: "Free Base64 Encoder/Decoder - Convert to Base64",
    ogDescription: "Encode and decode Base64 strings online. Free, fast, and secure.",
  },
  "color-picker": {
    title: "Color Picker - HEX, RGB, HSL Color Tool Online | AIO Tools",
    description: "Pick colors and convert between HEX, RGB, HSL, and other color formats. Free online color picker tool for designers and developers.",
    keywords: ["color picker", "color tool", "hex color", "rgb color", "hsl color", "color converter", "color palette", "color selector"],
    ogTitle: "Free Color Picker - HEX, RGB, HSL Converter",
    ogDescription: "Pick and convert colors between HEX, RGB, HSL formats. Free for designers.",
  },

  // CONVERTER TOOLS
  "image-converter": {
    title: "Image Converter - Convert JPG, PNG, WebP, GIF Online Free | AIO Tools",
    description: "Convert images between JPG, PNG, WebP, GIF, and other formats online for free. Fast image format converter with high-quality output.",
    keywords: ["image converter", "convert image", "jpg to png", "png to jpg", "webp converter", "image format converter", "convert image online", "picture converter"],
    ogTitle: "Free Image Converter - Convert Image Formats",
    ogDescription: "Convert images between JPG, PNG, WebP, and more. Fast and high quality.",
  },
  "audio-converter": {
    title: "Audio Converter - Convert MP3, WAV, OGG Online Free | AIO Tools",
    description: "Convert audio files between MP3, WAV, OGG, and other formats online for free. High-quality audio conversion with fast processing.",
    keywords: ["audio converter", "convert audio", "mp3 converter", "wav converter", "audio format converter", "convert mp3", "audio to mp3", "sound converter"],
    ogTitle: "Free Audio Converter - Convert Audio Formats",
    ogDescription: "Convert audio between MP3, WAV, OGG formats. High quality and free.",
  },
  "video-to-audio": {
    title: "Video to Audio Converter - Extract Audio from Video Free | AIO Tools",
    description: "Extract audio from video files online for free. Convert video to MP3, WAV, or other audio formats. Fast and high-quality extraction.",
    keywords: ["video to audio", "extract audio", "video to mp3", "convert video to audio", "audio extractor", "video audio converter", "extract sound from video"],
    ogTitle: "Free Video to Audio Converter - Extract Audio",
    ogDescription: "Extract audio from video files in MP3, WAV formats. Fast and free.",
  },
  "unit-converter": {
    title: "Unit Converter - Convert Length, Weight, Temperature Online | AIO Tools",
    description: "Convert units of length, weight, temperature, volume, and more online for free. Accurate unit conversion tool with all common units.",
    keywords: ["unit converter", "convert units", "length converter", "weight converter", "temperature converter", "metric converter", "imperial converter", "measurement converter"],
    ogTitle: "Free Unit Converter - Convert Length, Weight, Temperature",
    ogDescription: "Convert between all unit types. Length, weight, temperature, and more.",
  },
  "text-to-speech": {
    title: "Text to Speech - Convert Text to Natural Voice Online Free | AIO Tools",
    description: "Convert text to natural-sounding speech online for free. Text-to-speech tool with multiple voices and languages. Download as MP3.",
    keywords: ["text to speech", "tts", "text to voice", "speech synthesizer", "text reader", "voice generator", "text to audio", "read text aloud"],
    ogTitle: "Free Text to Speech - Natural Voice Generator",
    ogDescription: "Convert text to natural speech in multiple voices. Free TTS tool.",
  },

  // DOCUMENT TOOLS
  "word-to-pdf": {
    title: "Word to PDF Converter - Convert DOCX to PDF Online Free | AIO Tools",
    description: "Convert Word documents to PDF online for free. Fast DOCX to PDF converter with perfect formatting. No software installation required.",
    keywords: ["word to pdf", "docx to pdf", "convert word to pdf", "word to pdf converter", "doc to pdf", "word document to pdf", "docx converter"],
    ogTitle: "Free Word to PDF Converter - DOCX to PDF",
    ogDescription: "Convert Word documents to PDF online. Fast, free, and maintain formatting.",
  },
  "pdf-to-word": {
    title: "PDF to Word Converter - Convert PDF to DOCX Online Free | AIO Tools",
    description: "Convert PDF to editable Word documents online for free. Accurate PDF to DOCX conversion with formatting preserved. Edit PDFs easily.",
    keywords: ["pdf to word", "pdf to docx", "convert pdf to word", "pdf to word converter", "pdf to doc", "editable pdf", "pdf converter"],
    ogTitle: "Free PDF to Word Converter - PDF to DOCX",
    ogDescription: "Convert PDF to editable Word documents. Preserve formatting and free to use.",
  },
  "excel-to-pdf": {
    title: "Excel to PDF Converter - Convert XLSX to PDF Online Free | AIO Tools",
    description: "Convert Excel spreadsheets to PDF online for free. Fast XLSX to PDF converter with perfect table formatting. No signup required.",
    keywords: ["excel to pdf", "xlsx to pdf", "convert excel to pdf", "excel to pdf converter", "spreadsheet to pdf", "xls to pdf"],
    ogTitle: "Free Excel to PDF Converter - XLSX to PDF",
    ogDescription: "Convert Excel spreadsheets to PDF. Fast, free, and preserve formatting.",
  },
  "pdf-to-excel": {
    title: "PDF to Excel Converter - Convert PDF Tables to XLSX Free | AIO Tools",
    description: "Convert PDF tables to Excel spreadsheets online for free. Extract data from PDF to editable XLSX format. Accurate table conversion.",
    keywords: ["pdf to excel", "pdf to xlsx", "convert pdf to excel", "pdf to excel converter", "pdf table to excel", "extract pdf data"],
    ogTitle: "Free PDF to Excel Converter - PDF to XLSX",
    ogDescription: "Convert PDF tables to Excel spreadsheets. Extract data accurately and free.",
  },
  "powerpoint-to-pdf": {
    title: "PowerPoint to PDF - Convert PPTX to PDF Online Free | AIO Tools",
    description: "Convert PowerPoint presentations to PDF online for free. Fast PPTX to PDF converter. Maintain slide formatting and quality.",
    keywords: ["powerpoint to pdf", "pptx to pdf", "convert ppt to pdf", "presentation to pdf", "slides to pdf", "ppt converter"],
    ogTitle: "Free PowerPoint to PDF Converter - PPTX to PDF",
    ogDescription: "Convert PowerPoint presentations to PDF. Fast, free, and maintain quality.",
  },
  "pdf-watermark": {
    title: "PDF Watermark - Add Watermark to PDF Online Free | AIO Tools",
    description: "Add text or image watermarks to PDF files online for free. Protect and brand your PDF documents. Customize position, opacity, and style.",
    keywords: ["pdf watermark", "add watermark to pdf", "watermark pdf", "pdf stamp", "protect pdf", "brand pdf", "pdf watermarking tool"],
    ogTitle: "Free PDF Watermark Tool - Add Watermark to PDF",
    ogDescription: "Add custom watermarks to PDF files. Text or image watermarks, free to use.",
  },
  "document-viewer": {
    title: "Document Viewer - View Documents Online Free | AIO Tools",
    description: "View documents online without downloading. Support PDF, Word, Excel, PowerPoint. Free online document viewer with no signup.",
    keywords: ["document viewer", "view pdf online", "online document reader", "document preview", "pdf viewer", "word viewer", "document reader"],
    ogTitle: "Free Document Viewer - View Files Online",
    ogDescription: "View PDF, Word, Excel, PowerPoint online. No download required.",
  },
  "pdf-editor": {
    title: "PDF Editor - Edit PDF Text & Images Online Free | AIO Tools",
    description: "Edit PDF files online for free. Add text, images, and annotations to PDFs. Full-featured PDF editor with no software installation.",
    keywords: ["pdf editor", "edit pdf", "pdf editing tool", "modify pdf", "add text to pdf", "pdf annotator", "online pdf editor"],
    ogTitle: "Free PDF Editor - Edit PDF Files Online",
    ogDescription: "Edit PDF text, images, and annotations online. Full-featured and free.",
  },

  // PHOTO EDITING TOOLS
  "image-resize": {
    title: "Image Resize - Resize Images Online Free | AIO Tools",
    description: "Resize images by dimensions or percentage online for free. Fast image resizer tool with custom width and height. Maintain aspect ratio option.",
    keywords: ["resize image", "image resizer", "scale image", "change image size", "resize photo", "image dimensions", "resize picture"],
    ogTitle: "Free Image Resize Tool - Resize Photos Online",
    ogDescription: "Resize images by dimensions or percentage. Fast, free, and maintain quality.",
  },
  "image-crop": {
    title: "Image Crop - Crop Images Online Free | AIO Tools",
    description: "Crop images to specific size or aspect ratio online for free. Easy image cropping tool with preset ratios. Perfect for social media.",
    keywords: ["crop image", "image cropper", "crop photo", "cut image", "trim image", "image crop tool", "aspect ratio crop"],
    ogTitle: "Free Image Crop Tool - Crop Photos Online",
    ogDescription: "Crop images to any size or ratio. Free and easy to use.",
  },
  "image-rotate": {
    title: "Image Rotate & Flip - Rotate Images Online Free | AIO Tools",
    description: "Rotate and flip images online for free. Rotate images 90, 180, 270 degrees or flip horizontally/vertically. Simple image rotation tool.",
    keywords: ["rotate image", "flip image", "image rotation", "turn image", "mirror image", "rotate photo", "flip photo"],
    ogTitle: "Free Image Rotate & Flip Tool",
    ogDescription: "Rotate and flip images online. Simple, fast, and free.",
  },
  "photo-filters": {
    title: "Photo Filters - Apply Instagram-Style Filters Online Free | AIO Tools",
    description: "Apply Instagram-style filters to photos online for free. Enhance images with vintage, retro, and modern filter effects. One-click filters.",
    keywords: ["photo filters", "instagram filters", "image filters", "photo effects", "vintage filter", "retro filter", "apply filter"],
    ogTitle: "Free Photo Filters - Instagram-Style Effects",
    ogDescription: "Apply beautiful filters to photos. Instagram-style effects, free to use.",
  },
  "brightness-contrast": {
    title: "Adjust Brightness & Contrast - Edit Image Lighting Online Free | AIO Tools",
    description: "Adjust image brightness and contrast online for free. Enhance photo lighting and visibility. Real-time preview and easy controls.",
    keywords: ["adjust brightness", "adjust contrast", "brightness contrast", "image lighting", "enhance photo", "photo brightness", "image contrast"],
    ogTitle: "Free Brightness & Contrast Adjuster",
    ogDescription: "Adjust image brightness and contrast online. Enhance photos easily and free.",
  },
  "grayscale-converter": {
    title: "Grayscale Converter - Convert Image to Black & White Free | AIO Tools",
    description: "Convert images to grayscale (black and white) online for free. Create beautiful monochrome photos. Perfect for artistic effects.",
    keywords: ["grayscale converter", "black and white", "monochrome", "convert to grayscale", "black white image", "grayscale photo", "desaturate image"],
    ogTitle: "Free Grayscale Converter - Black & White Images",
    ogDescription: "Convert images to black and white grayscale. Free and instant conversion.",
  },
  "image-blur": {
    title: "Image Blur - Apply Blur Effect to Images Online Free | AIO Tools",
    description: "Apply blur effects to images online for free. Gaussian blur, motion blur, and bokeh effects. Adjust blur intensity and area.",
    keywords: ["image blur", "blur effect", "gaussian blur", "bokeh effect", "blur photo", "blur tool", "image blur online"],
    ogTitle: "Free Image Blur Tool - Apply Blur Effects",
    ogDescription: "Apply blur effects to images online. Gaussian, motion, bokeh blur. Free to use.",
  },
  "photo-collage": {
    title: "Photo Collage Maker - Create Collages Online Free | AIO Tools",
    description: "Create beautiful photo collages online for free. Combine multiple photos into stunning layouts. Various templates and grid options.",
    keywords: ["photo collage", "collage maker", "photo grid", "combine photos", "photo layout", "picture collage", "photo montage"],
    ogTitle: "Free Photo Collage Maker - Create Beautiful Collages",
    ogDescription: "Create photo collages with multiple layouts. Free and easy collage maker.",
  },
};

// Get related tools for internal linking
export function getRelatedTools(toolId: string, limit: number = 4): Array<{ id: string; name: string; href: string; description: string }> {
  const tool = tools.find((t) => t.id === toolId);
  if (!tool) return [];

  // Get tools from the same category, excluding the current tool
  const relatedTools = tools
    .filter((t) => t.category === tool.category && t.id !== toolId)
    .slice(0, limit)
    .map((t) => ({
      id: t.id,
      name: t.name,
      href: t.href,
      description: t.description,
    }));

  // If not enough tools in the same category, add featured tools
  if (relatedTools.length < limit) {
    const additionalTools = tools
      .filter((t) => t.featured && t.id !== toolId && !relatedTools.find((rt) => rt.id === t.id))
      .slice(0, limit - relatedTools.length)
      .map((t) => ({
        id: t.id,
        name: t.name,
        href: t.href,
        description: t.description,
      }));
    relatedTools.push(...additionalTools);
  }

  return relatedTools;
}

