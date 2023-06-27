export default function trimUrl(url: string) {
  if (url.startsWith("http://www.")) {
    const http = "http://www.";
    return url.slice(http.length);
  }
  if (url.startsWith("https://www.")) {
    const http = "https://www.";
    return url.slice(http.length);
  }
  if (url.startsWith("https://")) {
    const https = "https://";
    return url.slice(https.length);
  }
  if (url.startsWith("http://")) {
    const http = "http://";
    return url.slice(http.length);
  }

  return url;
}
