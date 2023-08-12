export default function myPlugin() {
  return {
    name: 'transform-file',

    transformIndexHtml(html: any) {
      return html.replace(
        /<title>(.*?)<\/title>/,
        '<title>Title replaced!</title>'
      );
    }
  };
}
