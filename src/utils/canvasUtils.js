/**
 * canvasUtils.js
 * Core canvas-based image compositing helpers.
 */

// Simple image cache so switching inputs does not repeatedly reload the file
const imageCache = new Map();

/**
 * Load an Image element from a URL and return it once ready.
 * Adds crossOrigin="anonymous" so the canvas is not tainted.
 */
export function loadImage(src) {
  if (imageCache.has(src)) {
    const cached = imageCache.get(src);
    if (cached.complete && cached.naturalWidth > 0) {
      return Promise.resolve(cached);
    }
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

/**
 * Composite the template image + student text onto a canvas.
 *
 * @param {HTMLCanvasElement} canvas   - target canvas element
 * @param {object}            template - template config object
 * @param {object}            details  - key-value dictionary of field values
 * @param {number}            [scale]  - optional render scale (default 2 for crisp preview)
 */
export async function renderToCanvas(canvas, template, details, scale = 2) {
  const img = await loadImage(template.file);

  const W = template.naturalWidth * scale;
  const H = template.naturalHeight * scale;

  canvas.width = W;
  canvas.height = H;

  const ctx = canvas.getContext("2d");

  // 1. Draw original un-modified cover image
  ctx.drawImage(img, 0, 0, W, H);

  // 2. Overlay student text fields into designated blank positions
  for (const field of template.fields) {
    const rawVal = details?.[field.key];
    const value = typeof rawVal === "string" ? rawVal.trim() : "";
    if (!value) continue;

    const x = field.xFrac * W;
    const y = field.yFrac * H;
    const maxWidth = field.maxWidthFrac * W;
    let currentFontSize = (field.fontSize || 14) * scale;
    const weight = field.bold ? "600" : "400";
    const fontFamily = field.fontFamily || "sans-serif";

    // Set initial font
    ctx.font = `${weight} ${currentFontSize}px ${fontFamily}`;

    // Auto-adjust font size down if text exceeds maximum width, preserving visual elegance
    const minFontSize = 9 * scale;
    while (ctx.measureText(value).width > maxWidth && currentFontSize > minFontSize) {
      currentFontSize -= 0.5 * scale;
      ctx.font = `${weight} ${currentFontSize}px ${fontFamily}`;
    }

    ctx.fillStyle = field.color || "#111827";
    ctx.textAlign = field.align || "left";
    ctx.textBaseline = "alphabetic";

    ctx.fillText(value, x, y, maxWidth);
  }

  return canvas;
}

/**
 * Export the composited canvas as a high-resolution PNG blob URL.
 */
export async function exportToPNG(canvas, template, details) {
  // Use scale = 3 for print-ready high-DPI output (approx 2367 x 3072 px for 789x1024)
  await renderToCanvas(canvas, template, details, 3);
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(URL.createObjectURL(blob)), "image/png", 1.0);
  });
}

/**
 * Export the composited canvas as an A4 PDF using jsPDF.
 * Maintains original aspect ratio and fills standard A4 (210 x 297 mm) page.
 */
export async function exportToPDF(canvas, template, details) {
  const { jsPDF } = await import("jspdf");

  // Render canvas at 3x scale for ultra crisp vector/raster print quality
  await renderToCanvas(canvas, template, details, 3);

  const dataURL = canvas.toDataURL("image/jpeg", 0.98);

  const A4_W = 210; // mm
  const A4_H = 297; // mm

  const imgRatio = template.naturalWidth / template.naturalHeight;
  const a4Ratio = A4_W / A4_H;

  let imgW, imgH, offsetX, offsetY;
  if (imgRatio > a4Ratio) {
    imgW = A4_W;
    imgH = A4_W / imgRatio;
    offsetX = 0;
    offsetY = (A4_H - imgH) / 2;
  } else {
    imgH = A4_H;
    imgW = A4_H * imgRatio;
    offsetX = (A4_W - imgW) / 2;
    offsetY = 0;
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  pdf.addImage(dataURL, "JPEG", offsetX, offsetY, imgW, imgH, undefined, "FAST");
  return pdf;
}
