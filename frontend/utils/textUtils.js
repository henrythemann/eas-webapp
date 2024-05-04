export const pageTitleToUrl = (pageTitle) => {
    return pageTitle.toLowerCase().replaceAll(' ','-');
}

export const formatPhoneNumber = (phoneNumber) => {
    return `${phoneNumber.substr(0,3)}.${phoneNumber.substr(3,3)}.${phoneNumber.substr(6)}`;
}

export const kebabToCamelCase = (str) => {
    return str.replace(/-./g, (match) => match[1].toUpperCase());
}