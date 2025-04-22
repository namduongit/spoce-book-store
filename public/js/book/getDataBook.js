export function formatMoney(valueString) {
    if (typeof valueString !== 'string') valueString = String(valueString);
    return valueString.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
}

export async function fetchData(URL) {
    try {
        let response = await fetch(URL);
        let dataResponse = await response.json();
        return dataResponse;
    } catch (error) {
        return null;
    }
}

export async function getNameCategoryByID(categoryId) {
    const URL = `api/categories/detail.php?id=${categoryId}`;

    let response = await fetchData(URL);

    let result = response['data'].name;

    return result;
}

export async function getNameAuthorByID(authorId) {
    const URL = `api/authors/detail.php?id=${authorId}`;

    let response = await fetchData(URL);
    let result = response['data'].name;
    return result;
}


export async function getNameCoverByID(coverId) {
    const URL = `api/covers/detail.php?id=${coverId}`;

    let response = await fetchData(URL);
    let result = response['data'].name;
    return result;
}

export async function getNamePublisherByID(publisherId) {
    const URL = `api/publishers/detail.php?id=${publisherId}`;

    let response = await fetchData(URL);
    let result = response['data'].name;
    return result;
}

export async function getBookByTrueName(bookName) {
    const URL = `api/books/get.php?bookName=${bookName}`;

    let response = await fetchData(URL);
    return response;
}


export async function getBookByID(bookID) {
    let response = await fetch(`api/books/get.php?bookID=${bookID}`);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data = await response.json();
    return data;
}