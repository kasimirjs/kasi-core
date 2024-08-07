/**
 * Create a new Element
 *
 * @param tagName {string}      The Tag Name
 * @param attributes {string<string>}   Attributes to set initially
 * @param appendToElement {HTMLElement}
 * @param children {HTMLElement[]|string}
 * @return HTMLElement
 */
export function ka_create_element (tagName : string, attributes : any = null,  children : HTMLElement[] | NodeList | string = null, appendToElement : ParentNode = null) : HTMLElement{
    let e = document.createElement(tagName);
    if (attributes === null)
        attributes = {}

    for(let attName in attributes) {
        e.setAttribute(attName, attributes[attName]);
    }

    if (children instanceof NodeList) {
        children = Array.from(children) as HTMLElement[];
    } else if (Array.isArray(children)) {
        for(let ce of children) {
            e.appendChild(ce);
        }
    } else if (typeof children === "string") {
        e.innerText = children;
    }

    if (appendToElement !== null) {
        appendToElement.appendChild(e);
    }
    return e;
}
