const { v2: cloudinary } = require('cloudinary');

// Configure from production env
cloudinary.config({
  cloud_name: 'dblmnsnrv',
  api_key: '948355921728894',
  api_secret: 'pVJ7GOJYzBQqi96mfgD666mAgo0'
});

async function testUpload() {
  try {
    console.log('Testing Cloudinary authenticated PDF upload...');

    // Upload test PDF with authenticated type
    const result = await cloudinary.uploader.upload('/tmp/test-katalog.pdf', {
      folder: 'firma_kataloglari',
      resource_type: 'raw',
      type: 'authenticated',
      use_filename: true,
      unique_filename: true,
      format: 'pdf'
    });

    console.log('Upload successful!');
    console.log('Public ID:', result.public_id);
    console.log('Secure URL:', result.secure_url);

    // Generate signed URL
    const signedUrl = cloudinary.url(result.public_id, {
      resource_type: 'raw',
      type: 'authenticated',
      sign_url: true,
      secure: true
    });

    console.log('Signed URL:', signedUrl);
    console.log('\nTest completed successfully!');

  } catch (error) {
    console.error('Upload failed:', error.message);
    if (error.http_code) {
      console.error('HTTP Code:', error.http_code);
    }
    process.exit(1);
  }
}

testUpload();
