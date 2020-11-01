/**
 * @param {string} tagName = 'div' || 'span' || 'li'
 * @param {Record<string, string|number|function>} attributes
 * @param {HTMLElement[]|string|number} children
 * @return {HTMLElement}
 */
export const Dom = (tagName, attributes = {}, children = []) => {
    const dom = document.createElement(tagName);
    for (const [name, value] of Object.entries(attributes)) {
        if (['string', 'number'].includes(typeof value)) {
            dom.setAttribute(name, value);
        } else {
            dom[name] = value;
        }
    }
    if (['string', 'number'].includes(typeof children)) {
        dom.textContent = children;
    } else {
        for (const child of children) {
            dom.appendChild(child);
        }
    }
    return dom;
};
