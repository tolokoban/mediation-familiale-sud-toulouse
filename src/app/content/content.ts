import Content from './content.json'

type IContent = Array<string | Array<string | string[]>>

export default {
    applyContent() {
        const content: IContent = Content
        const root = document.getElementById("sections")
        if (!root) return
        
        const TWO = 2
        let sectionIndex = 0

        for (let i = 0 ; i < content.length; i += TWO) {
            const sectionName = content[i + 0]
            if (typeof sectionName !== 'string') continue
            const items = content[i + 1]
            if (!Array.isArray(items)) continue
            const section = tag("section", root)
            section.setAttribute("data-name", `section${sectionIndex++}`)
            tag("h1", sectionName, section)
            const ul = tag("ul", section)
            ul.classList.add("section")
            for (let k = 0 ; k < items.length; k += TWO) {
                const itemName = items[k + 0]
                if (typeof itemName !== 'string') continue
                const li = tag("li", ul)
                attachEvent(li)
                tag("h2", itemName, li)
                const div = tag("div", li)
                const paragraphs = items[k + 1]
                if (!Array.isArray(paragraphs)) continue
                for (const par of paragraphs) {
                    tag("p", par, div)
                }
                tag("button", "Lire la suite...", li)
            }
        }
    }
}

function tag(name: string, ...args: Array<string | HTMLElement>): HTMLElement {
    const elem = document.createElement(name)
    for (const arg of args) {
        if (typeof arg === 'string') {
            elem.textContent = arg
        } else {
            arg.appendChild(elem)
        }
    }
    return elem
}

function attachEvent(elem: HTMLElement) {
    onTap(elem, () => elem.classList.toggle("expand"))
}

function onTap(elem: HTMLElement, action: () => void) {
    elem.addEventListener("click", action)
}