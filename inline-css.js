import fs from 'fs';
import path from 'path';

try {
  const distDir = path.resolve(process.cwd(), 'dist');
  const assetsDir = path.join(distDir, 'assets');

  // Ensure directories exist
  if (!fs.existsSync(distDir)) {
    console.error('dist folder not found');
    process.exit(1);
  }

  // Find the generated CSS file in assets
  if (!fs.existsSync(assetsDir)) {
    console.warn('assets folder not found in dist. Skipping inlining.');
    process.exit(0);
  }

  const cssFile = fs.readdirSync(assetsDir).find(f => f.endsWith('.css'));

  if (!cssFile) {
    console.warn('No CSS file found in dist/assets. Skipping inlining.');
    process.exit(0);
  }

  const cssPath = path.join(assetsDir, cssFile);
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  console.log(`Found built CSS file: ${cssFile} (${(cssContent.length / 1024).toFixed(2)} KB)`);

  // Find all HTML files in dist/
  const htmlFiles = fs.readdirSync(distDir).filter(f => f.endsWith('.html'));

  if (htmlFiles.length === 0) {
    console.warn('No HTML files found in dist/. Skipping inlining.');
    process.exit(0);
  }

  for (const file of htmlFiles) {
    const filePath = path.join(distDir, file);
    let htmlContent = fs.readFileSync(filePath, 'utf8');

    // Create regex matching the generated style tag injected by Vite
    const linkRegex = new RegExp(`<link[^>]*href=["']\\/assets\\/${cssFile}["'][^>]*>`, 'gi');

    if (linkRegex.test(htmlContent)) {
      const styleBlock = `<style>${cssContent}</style>`;
      htmlContent = htmlContent.replace(linkRegex, styleBlock);
      fs.writeFileSync(filePath, htmlContent, 'utf8');
      console.log(`Successfully inlined CSS into: ${file}`);
    } else {
      console.log(`No matching CSS link found in: ${file}`);
    }
  }

  console.log('CSS Inlining complete!');
} catch (error) {
  console.error('Error during CSS inlining:', error);
}
