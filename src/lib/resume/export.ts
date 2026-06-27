import { RESUME_PDF_FILENAME } from '$lib/content';

/** Opens the print-optimized résumé page in a new tab. */
export function exportResumePdf(): void {
	const url = new URL('/resume', window.location.origin);
	url.searchParams.set('export', '1');
	window.open(url.toString(), '_blank', 'noopener,noreferrer');
}

export function resumePdfFilename(): string {
	return RESUME_PDF_FILENAME;
}

/** Browser print → user picks "Save as PDF" in the dialog. */
export function printResume(): void {
	window.print();
}

/** Client-side PDF download via print stylesheet (no extra deps). */
export async function downloadResumePdf(source: HTMLElement): Promise<void> {
	const { default: html2pdf } = await import('html2pdf.js');

	await html2pdf()
		.set({
			margin: [0.45, 0.5, 0.45, 0.5],
			filename: RESUME_PDF_FILENAME,
			image: { type: 'jpeg', quality: 0.96 },
			html2canvas: {
				scale: 2,
				useCORS: true,
				letterRendering: true,
				scrollY: 0
			},
			jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
		})
		.from(source)
		.save();
}