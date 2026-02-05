// SEO-optimized content for each tool page
// This content helps with Google rankings and provides value to users

export interface SEOContent {
  whatIsIt: {
    title: string;
    content: string;
  };
  howToUse: {
    title: string;
    steps: string[];
  };
  features: {
    title: string;
    items: string[];
  };
  faq: {
    title: string;
    questions: Array<{ q: string; a: string }>;
  };
}

export const toolSEOContent: Record<string, SEOContent> = {
  "pdf-merge": {
    whatIsIt: {
      title: "Apa itu PDF Merger?",
      content: "PDF Merger adalah tool online gratis yang memungkinkan Anda menggabungkan beberapa file PDF menjadi satu dokumen PDF. Dengan AIO Tools PDF Merger, Anda dapat dengan mudah merge multiple PDF files tanpa perlu install software apapun. Tool ini sangat berguna untuk menggabungkan invoice, laporan, dokumen bisnis, atau file akademik menjadi satu file yang lebih mudah dikelola. Proses penggabungan dilakukan secara online dengan enkripsi SSL, menjamin keamanan data Anda. Tidak ada batasan jumlah file, tidak ada watermark, dan sepenuhnya gratis.",
    },
    howToUse: {
      title: "Cara Merge PDF Online",
      steps: [
        "Upload beberapa file PDF dengan cara drag & drop atau klik tombol 'Select PDF Files'",
        "Atur urutan file PDF sesuai keinginan menggunakan tombol panah atas/bawah",
        "Klik tombol 'Merge PDFs' untuk memulai proses penggabungan",
        "Download hasil PDF yang sudah digabungkan ke komputer Anda",
      ],
    },
    features: {
      title: "Keunggulan PDF Merger AIO Tools",
      items: [
        "Gratis 100% - Tidak ada biaya tersembunyi atau batasan file",
        "Tanpa Watermark - Hasil PDF bersih tanpa logo atau tanda air",
        "Proses Cepat - Merge PDF dalam hitungan detik",
        "Aman & Privat - File otomatis dihapus setelah proses selesai",
        "Tanpa Install - Bekerja di browser, tidak perlu download software",
        "Support Semua Device - Kompatibel dengan Windows, Mac, Android, iOS",
      ],
    },
    faq: {
      title: "FAQ - Pertanyaan Umum",
      questions: [
        { q: "Apakah ada batasan ukuran file PDF?", a: "Tidak ada batasan ukuran file. Anda dapat merge PDF dengan ukuran berapa pun." },
        { q: "Berapa banyak PDF yang bisa digabungkan?", a: "Tidak ada batasan jumlah. Anda bisa menggabungkan 2, 10, atau bahkan 100+ file PDF sekaligus." },
        { q: "Apakah file saya aman?", a: "Ya, sangat aman. Semua file diproses dengan enkripsi SSL dan otomatis dihapus dari server setelah 1 jam." },
        { q: "Apakah perlu daftar akun?", a: "Tidak perlu. Tool ini 100% gratis dan tidak memerlukan registrasi atau login." },
      ],
    },
  },

  "image-compressor": {
    whatIsIt: {
      title: "Apa itu Image Compressor?",
      content: "Image Compressor adalah tool online gratis untuk mengompres dan mengurangi ukuran file gambar tanpa mengurangi kualitas visual secara signifikan. Tool ini menggunakan algoritma kompresi canggih yang dapat mengurangi ukuran file JPG, PNG, dan WebP hingga 80% lebih kecil. Sangat berguna untuk optimasi website, mempercepat loading time, menghemat bandwidth, dan memenuhi persyaratan ukuran file untuk upload di platform online. AIO Tools Image Compressor bekerja langsung di browser Anda, menjaga privasi dan keamanan gambar Anda.",
    },
    howToUse: {
      title: "Cara Kompres Gambar Online",
      steps: [
        "Upload gambar JPG, PNG, atau WebP dengan drag & drop atau klik 'Select Image'",
        "Atur tingkat kompresi menggunakan slider (10% - 100%)",
        "Klik tombol 'Compress Image' untuk memulai proses kompresi",
        "Bandingkan hasil kompresi dengan gambar original",
        "Download gambar yang sudah dikompres jika hasilnya memuaskan",
      ],
    },
    features: {
      title: "Keunggulan Image Compressor AIO Tools",
      items: [
        "Kompresi hingga 80% - Kurangi ukuran file drastis tanpa kehilangan kualitas",
        "Support Multiple Format - JPG, PNG, WebP, dan format lainnya",
        "Preview Real-time - Lihat perbandingan sebelum dan sesudah kompresi",
        "Batch Processing - Kompres banyak gambar sekaligus (coming soon)",
        "Kualitas Terjaga - Algoritma smart compression mempertahankan kualitas visual",
        "100% Gratis - Tanpa watermark, tanpa batasan, tanpa biaya",
      ],
    },
    faq: {
      title: "FAQ - Pertanyaan Umum",
      questions: [
        { q: "Apakah kualitas gambar akan rusak?", a: "Tidak. Tool kami menggunakan smart compression yang menjaga kualitas visual gambar." },
        { q: "Format gambar apa saja yang didukung?", a: "Kami support JPG, JPEG, PNG, WebP, dan format gambar populer lainnya." },
        { q: "Berapa persen ukuran bisa dikurangi?", a: "Tergantung gambar original, biasanya 50-80% lebih kecil dengan kualitas tetap bagus." },
        { q: "Apakah gambar saya disimpan di server?", a: "Tidak. Semua proses dilakukan di browser Anda, gambar tidak diupload ke server." },
      ],
    },
  },

  "youtube-downloader": {
    whatIsIt: {
      title: "Apa itu YouTube Downloader?",
      content: "YouTube Downloader adalah tool online gratis yang memungkinkan Anda download video YouTube dalam format MP4 atau convert YouTube ke MP3. Dengan AIO Tools YouTube Downloader, Anda dapat menyimpan video favorit, tutorial, musik, atau konten edukasi dari YouTube untuk ditonton offline. Tool ini support download dalam berbagai kualitas mulai dari 144p hingga 4K (jika tersedia), dan dapat extract audio saja dalam format MP3. Tidak perlu install aplikasi atau software, cukup paste URL YouTube dan download langsung.",
    },
    howToUse: {
      title: "Cara Download Video YouTube",
      steps: [
        "Copy URL video YouTube yang ingin Anda download",
        "Paste URL ke kolom input pada halaman YouTube Downloader",
        "Pilih format (MP4 untuk video atau MP3 untuk audio saja)",
        "Pilih kualitas video yang diinginkan (360p, 720p, 1080p, 4K)",
        "Klik tombol 'Download' dan tunggu proses selesai",
        "File akan otomatis tersimpan di folder download Anda",
      ],
    },
    features: {
      title: "Keunggulan YouTube Downloader AIO Tools",
      items: [
        "Support HD & 4K - Download video dalam kualitas tinggi hingga 4K",
        "YouTube to MP3 - Convert video YouTube ke format audio MP3",
        "Tanpa Watermark - Video hasil download bersih tanpa logo",
        "Fast Download - Kecepatan download maksimal dari server cepat",
        "No Ads - Tidak ada iklan yang mengganggu saat download",
        "All Devices - Bisa digunakan di HP, tablet, laptop, atau PC",
      ],
    },
    faq: {
      title: "FAQ - Pertanyaan Umum",
      questions: [
        { q: "Apakah legal download video YouTube?", a: "Download untuk personal use biasanya diperbolehkan. Namun, redistribusi atau penggunaan komersial tanpa izin tidak diperbolehkan." },
        { q: "Apakah bisa download playlist YouTube?", a: "Saat ini belum support playlist. Anda perlu download video satu per satu." },
        { q: "Kualitas video apa yang tersedia?", a: "Tergantung video original. Biasanya tersedia 144p, 240p, 360p, 480p, 720p, 1080p, dan 4K." },
        { q: "Apakah perlu install aplikasi?", a: "Tidak perlu. Tool ini bekerja langsung di browser tanpa install apapun." },
      ],
    },
  },

  "tiktok-downloader": {
    whatIsIt: {
      title: "Apa itu TikTok Downloader?",
      content: "TikTok Downloader adalah tool online gratis untuk download video TikTok tanpa watermark. Watermark TikTok yang biasanya muncul di pojok video akan otomatis dihapus, memberikan Anda video bersih dengan kualitas HD. Tool ini sangat berguna untuk content creator yang ingin repost konten, menyimpan video favorit, atau membuat compilation. AIO Tools TikTok Downloader bekerja cepat, tidak memerlukan login TikTok, dan support semua jenis video TikTok termasuk video dengan musik, effects, dan filters.",
    },
    howToUse: {
      title: "Cara Download TikTok Tanpa Watermark",
      steps: [
        "Buka aplikasi TikTok dan temukan video yang ingin didownload",
        "Tap tombol 'Share' dan pilih 'Copy Link'",
        "Paste link TikTok ke kolom input pada halaman ini",
        "Klik tombol 'Download' untuk memproses video",
        "Pilih 'Download Video' untuk video tanpa watermark atau 'Download Audio' untuk MP3",
        "Video akan tersimpan di galeri atau folder download Anda",
      ],
    },
    features: {
      title: "Keunggulan TikTok Downloader AIO Tools",
      items: [
        "Tanpa Watermark - Video bersih tanpa logo TikTok di pojok",
        "Kualitas HD - Download video dalam kualitas original (720p/1080p)",
        "TikTok to MP3 - Extract audio dari video TikTok",
        "No Login Required - Tidak perlu login akun TikTok",
        "Fast & Reliable - Server cepat dengan uptime 99.9%",
        "Mobile Friendly - Optimized untuk HP Android & iOS",
      ],
    },
    faq: {
      title: "FAQ - Pertanyaan Umum",
      questions: [
        { q: "Apakah video private bisa didownload?", a: "Tidak. Hanya video public yang bisa didownload." },
        { q: "Apakah watermark benar-benar hilang?", a: "Ya, 100%. Video hasil download bersih tanpa watermark TikTok." },
        { q: "Berapa kualitas video hasil download?", a: "Kualitas sama dengan video original di TikTok, biasanya 720p atau 1080p." },
        { q: "Apakah bisa download video TikTok orang lain?", a: "Ya, selama video tersebut public dan download diperbolehkan oleh creator." },
      ],
    },
  },

  // Continue with other tools...
  "password-generator": {
    whatIsIt: {
      title: "Apa itu Password Generator?",
      content: "Password Generator adalah tool online gratis untuk membuat password acak yang kuat dan aman. Dengan AIO Tools Password Generator, Anda dapat generate password dengan kombinasi huruf besar, huruf kecil, angka, dan simbol khusus untuk maksimalkan keamanan akun online Anda. Password yang kuat sangat penting untuk melindungi akun email, social media, banking, dan data pribadi dari hacker atau cybercriminals. Tool ini juga dilengkapi dengan password strength checker untuk memastikan password Anda cukup kuat.",
    },
    howToUse: {
      title: "Cara Generate Password Kuat",
      steps: [
        "Tentukan panjang password (8-64 karakter, rekomendasi minimal 12)",
        "Pilih jenis karakter: uppercase, lowercase, numbers, symbols",
        "Klik tombol 'Generate Password' atau otomatis generate",
        "Password acak akan muncul dengan indikator kekuatan (weak/medium/strong)",
        "Klik tombol 'Copy' untuk menyalin password ke clipboard",
        "Simpan password di password manager atau tempat aman",
      ],
    },
    features: {
      title: "Keunggulan Password Generator AIO Tools",
      items: [
        "Strong & Secure - Generate password acak dengan entropi tinggi",
        "Customizable - Atur panjang dan jenis karakter sesuai kebutuhan",
        "Password Strength Indicator - Lihat seberapa kuat password Anda",
        "One-Click Copy - Salin password ke clipboard dengan satu klik",
        "No Storage - Password tidak disimpan di server atau database",
        "Instant Generate - Buat password baru setiap saat tanpa delay",
      ],
    },
    faq: {
      title: "FAQ - Pertanyaan Umum",
      questions: [
        { q: "Berapa panjang password yang aman?", a: "Minimal 12 karakter dengan kombinasi huruf, angka, dan simbol. Semakin panjang semakin aman." },
        { q: "Apakah password yang di-generate aman?", a: "Ya, sangat aman. Password di-generate secara random dan tidak tersimpan di server." },
        { q: "Bagaimana cara mengingat password yang rumit?", a: "Gunakan password manager seperti LastPass, 1Password, atau Bitwarden." },
        { q: "Apakah saya harus pakai simbol?", a: "Sangat direkomendasikan. Simbol meningkatkan kompleksitas dan keamanan password." },
      ],
    },
  },

  "json-formatter": {
    whatIsIt: {
      title: "Apa itu JSON Formatter?",
      content: "JSON Formatter adalah tool online gratis untuk memformat, beautify, dan validate JSON code. Tool ini sangat berguna bagi developers untuk merapikan JSON yang berantakan (minified), mengecek syntax error, dan membuat JSON lebih readable. AIO Tools JSON Formatter support JSON prettify (indentation otomatis), JSON minify (mengurangi ukuran file), JSON validation (cek kesalahan syntax), dan JSON viewer untuk eksplorasi struktur data yang kompleks. Perfect untuk API testing, debugging, dan development workflow.",
    },
    howToUse: {
      title: "Cara Format JSON Online",
      steps: [
        "Paste atau ketik JSON code di kolom input",
        "Tool otomatis mendeteksi dan validate JSON syntax",
        "Klik 'Format/Beautify' untuk merapikan JSON dengan indentation",
        "Klik 'Minify' untuk menghilangkan whitespace dan kurangi ukuran",
        "Klik 'Copy' untuk salin hasil ke clipboard",
        "Error akan ditampilkan jika ada syntax yang salah",
      ],
    },
    features: {
      title: "Keunggulan JSON Formatter AIO Tools",
      items: [
        "Auto-Validation - Deteksi syntax error secara otomatis",
        "Beautify JSON - Rapikan JSON dengan indentation yang proper",
        "Minify JSON - Compress JSON untuk production use",
        "Syntax Highlighting - Color-coded untuk mudah dibaca",
        "Error Detection - Tampilkan error message yang jelas",
        "Copy to Clipboard - Salin hasil dengan satu klik",
      ],
    },
    faq: {
      title: "FAQ - Pertanyaan Umum",
      questions: [
        { q: "Apa beda JSON beautify dan minify?", a: "Beautify menambahkan indentation untuk readability. Minify menghilangkan whitespace untuk ukuran lebih kecil." },
        { q: "Apakah bisa validate JSON API response?", a: "Ya, paste response API dan tool akan validate structure-nya." },
        { q: "Apakah support JSON dengan nested object?", a: "Ya, support JSON kompleks dengan nested object dan array berapapun levelnya." },
        { q: "Apakah data JSON saya aman?", a: "Ya, semua proses di browser. Data tidak dikirim ke server." },
      ],
    },
  },

  "word-counter": {
    whatIsIt: {
      title: "Apa itu Word Counter?",
      content: "Word Counter adalah tool online gratis untuk menghitung jumlah kata, karakter, kalimat, dan paragraf dalam sebuah teks. Tool ini sangat berguna untuk writer, blogger, student, content creator, dan SEO specialist yang perlu memenuhi target jumlah kata tertentu. AIO Tools Word Counter bekerja real-time, jadi Anda bisa lihat jumlah kata bertambah saat mengetik. Selain itu, tool ini juga menampilkan estimasi reading time, character count (dengan dan tanpa spasi), dan keyword density untuk keperluan SEO.",
    },
    howToUse: {
      title: "Cara Menggunakan Word Counter",
      steps: [
        "Ketik atau paste teks Anda di kolom input",
        "Statistik akan otomatis muncul real-time: word count, character count, dll",
        "Lihat estimasi reading time untuk pembaca",
        "Check keyword density jika perlu untuk SEO optimization",
        "Gunakan data ini untuk memastikan teks memenuhi target yang diinginkan",
      ],
    },
    features: {
      title: "Keunggulan Word Counter AIO Tools",
      items: [
        "Real-Time Counting - Hitung kata secara instant saat mengetik",
        "Multiple Metrics - Word count, character count, sentence count, paragraph count",
        "Reading Time - Estimasi waktu baca untuk pembaca",
        "Keyword Density - Analisa keyword untuk SEO",
        "Character with/without Spaces - Dua jenis penghitungan karakter",
        "Free & Unlimited - Tidak ada batasan jumlah teks atau penggunaan",
      ],
    },
    faq: {
      title: "FAQ - Pertanyaan Umum",
      questions: [
        { q: "Bagaimana cara menghitung kata di Word Counter?", a: "Cukup paste atau ketik teks, dan jumlah kata akan muncul otomatis." },
        { q: "Apakah spasi dihitung sebagai karakter?", a: "Kami tampilkan dua angka: karakter dengan spasi dan tanpa spasi." },
        { q: "Berapa jumlah kata ideal untuk artikel blog?", a: "Untuk SEO, direkomendasikan minimal 1000-1500 kata untuk artikel berkualitas." },
        { q: "Apakah reading time akurat?", a: "Reading time dihitung dengan asumsi 200-250 kata per menit (rata-rata orang dewasa)." },
      ],
    },
  },

  "image-resize": {
    whatIsIt: {
      title: "Apa itu Image Resize?",
      content: "Image Resize adalah tool online gratis untuk mengubah ukuran gambar dengan mengatur width (lebar) dan height (tinggi) dalam pixel atau persentase. Tool ini sangat berguna untuk menyesuaikan ukuran gambar agar sesuai dengan requirement platform tertentu, seperti profile picture social media, thumbnail video, header website, atau printing. AIO Tools Image Resize mempertahankan aspect ratio secara otomatis agar gambar tidak terdistorsi, namun Anda juga bisa custom ratio jika diperlukan. Support semua format gambar populer: JPG, PNG, WebP, GIF.",
    },
    howToUse: {
      title: "Cara Resize Gambar Online",
      steps: [
        "Upload gambar yang ingin diresize",
        "Pilih metode resize: by dimensions (pixel) atau by percentage",
        "Masukkan width dan height baru, atau persentase (misalnya 50% untuk setengah ukuran)",
        "Toggle 'Maintain Aspect Ratio' untuk menjaga proporsi gambar",
        "Preview hasil resize sebelum download",
        "Klik 'Download' untuk simpan gambar yang sudah diresize",
      ],
    },
    features: {
      title: "Keunggulan Image Resize AIO Tools",
      items: [
        "Flexible Resize - By pixel atau by percentage",
        "Maintain Aspect Ratio - Jaga proporsi agar gambar tidak gepeng/memanjang",
        "Preset Sizes - Ukuran populer untuk Instagram, Facebook, Twitter, dll",
        "Batch Resize - Resize banyak gambar sekaligus (coming soon)",
        "High Quality - Algoritma resize menjaga kualitas gambar",
        "All Formats - Support JPG, PNG, WebP, GIF, BMP",
      ],
    },
    faq: {
      title: "FAQ - Pertanyaan Umum",
      questions: [
        { q: "Apa beda resize by pixel dan by percentage?", a: "By pixel: atur ukuran spesifik (misal 800x600). By percentage: kurangi/perbesar proporsi (misal 50% jadi setengah ukuran)." },
        { q: "Apakah gambar jadi blur setelah diresize?", a: "Tidak jika resize to smaller size. Tapi resize to larger size bisa sedikit blur." },
        { q: "Ukuran berapa untuk Instagram post?", a: "Instagram post ideal: 1080x1080 px (square) atau 1080x1350 px (portrait)." },
        { q: "Apakah aspect ratio otomatis terjaga?", a: "Ya, secara default aspect ratio terjaga. Tapi bisa dimatikan jika perlu custom ratio." },
      ],
    },
  },
};

// Default SEO content template for tools without specific content
export const defaultSEOContent: SEOContent = {
  whatIsIt: {
    title: "Tentang Tool Ini",
    content: "Tool online gratis yang mudah digunakan untuk membantu pekerjaan Anda. Tidak perlu install software, bekerja langsung di browser, dan sepenuhnya gratis tanpa batasan.",
  },
  howToUse: {
    title: "Cara Menggunakan",
    steps: [
      "Upload atau input data Anda",
      "Pilih opsi atau setting yang diinginkan",
      "Klik tombol proses untuk memulai",
      "Download atau copy hasil yang sudah jadi",
    ],
  },
  features: {
    title: "Keunggulan Tool Ini",
    items: [
      "Gratis 100% - Tanpa biaya tersembunyi",
      "Tanpa Install - Bekerja di browser",
      "Aman & Privat - Data Anda terjaga",
      "Fast Processing - Hasil instan",
      "All Devices - Desktop, tablet, mobile",
      "No Registration - Langsung pakai tanpa daftar",
    ],
  },
  faq: {
    title: "FAQ - Pertanyaan Umum",
    questions: [
      { q: "Apakah tool ini gratis?", a: "Ya, 100% gratis tanpa batasan." },
      { q: "Apakah perlu daftar akun?", a: "Tidak perlu. Langsung bisa digunakan tanpa registrasi." },
      { q: "Apakah data saya aman?", a: "Ya, semua data diproses dengan aman dan tidak disimpan di server kami." },
      { q: "Apakah bisa digunakan di HP?", a: "Ya, tool ini responsive dan bisa digunakan di semua device." },
    ],
  },
};

// Helper function to get SEO content for a tool
export function getToolSEOContent(toolId: string): SEOContent {
  return toolSEOContent[toolId] || defaultSEOContent;
}

