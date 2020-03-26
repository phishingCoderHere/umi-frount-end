/*
 * Adapted from:
 * https://developer.mozilla.org/en-US/docs/Web/API/document/cookie#Example_2_Get_a_sample_cookie_named_test2
 * @param name Name of the cookie
 */
// eslint-disable-next-line no-useless-escape
export const read = (cookieName: string) => {
    console.log('cookieName', cookieName);
    console.log('document.cookie', document.cookie);

    const result = document.cookie.replace(RegExp(`(?:(?:^|.*;\\s*)${cookieName}\\s*\\=\\s*([^;]*).*$)|^.*$/`), '$1');
    console.log('result', result);
    return result

}

export default { read };
