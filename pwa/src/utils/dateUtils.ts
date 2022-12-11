export function dateToInputFormat(date: Date): string {
    const dateArray = new Date(date).toLocaleString("en-GB").substring(0,10).split('/');
    return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
}
