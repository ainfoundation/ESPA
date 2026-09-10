const link = "https://drive.google.com/file/d/1bN1_Tf6D0T3uR-fJ5qTzH_nF_QyM-zJk";
let iframeSrc = link;
if (!iframeSrc.startsWith('http') && !iframeSrc.includes('/')) {
  iframeSrc = `https://drive.google.com/file/d/${iframeSrc}/preview`;
} else {
  const driveMatch = iframeSrc.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || iframeSrc.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    iframeSrc = `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  } else {
    const docsMatch = iframeSrc.match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
    if (docsMatch) {
      iframeSrc = `https://docs.google.com/document/d/${docsMatch[1]}/preview`;
    }
  }
}
console.log(iframeSrc);
