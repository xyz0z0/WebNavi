export function renderClickableLinks(text: string): string {
    const urlRegex = /(https?:\/\/\S+)/gi;
    return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
}
