export function urlToFile(url: string, fileName: string): Promise<File | undefined> {
    const fileType = url.substring(url.search(':') + 1, url.search(';'));
    return fetch(url)
        .then(res => res.blob())
        .then(blob => {
            console.log("plik: ")

            const file = new File([blob], fileName + '.' + fileType.substring(fileType.search('/')+1), { type: fileType });
            console.log(file)
            return file;
        })
        .catch((error) => {
            console.error(error);
            return undefined;
        });
    
}
