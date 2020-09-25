import { mainModule } from "process"

export default { initialize }

const DEFAULT_DELAY = 200
const MARGIN = 60

const handleScroll = throttler(() => {
    const main = document.querySelector("main")
    if (!main) return

    const scrollTop = main.scrollTop
    const height = main.getBoundingClientRect().height
    let nearestId = ""
    let shortestDistance = Number.MAX_SAFE_INTEGER
    let foundEntirelyVisibleSection = false
    const sections = main.querySelectorAll("section[data-name]")

    for (const section of sections) {
        const rect = section.getBoundingClientRect()
        const top = rect.top
        const bottom = top + rect.height
        if (top > height) continue
        const distance = Math.abs(top)
        if (distance < shortestDistance) {
            shortestDistance = distance
            nearestId = `#${section.getAttribute("data-name") || "null"}`
        } else if (top > 0 && bottom < height && !foundEntirelyVisibleSection) {
            shortestDistance = distance
            nearestId = `#${section.getAttribute("data-name") || "null"}`
            foundEntirelyVisibleSection = true
        }
    }

    const anchors = document.body.querySelectorAll("a.link")
    for (const anchor of anchors) {
        const href = anchor.getAttribute("href")
        if (href === nearestId) {
            anchor.classList.add("in")
        } else {
            anchor.classList.remove("in")
        }
    }
})

function initialize() {
    const main = document.querySelector("main")

    window.onhashchange = (evt: HashChangeEvent) => {
        const hashIndex = evt.newURL.lastIndexOf("#")
        const hash = evt.newURL.substr(hashIndex + 1)
        if (!main) return
        const target = document.querySelector(`section[data-name="${hash}"]`)
        if (!target) return
        const destination = main.scrollTop + target.getBoundingClientRect().top - MARGIN
        main.scrollTo({
            left: 0,
            top: destination,
            behavior: "smooth"
        })
    }

    if (main) {
        main.addEventListener("scroll", handleScroll, false)
    }
}

type IAction = () => void

function throttler(action: IAction, delay: number = DEFAULT_DELAY): IAction {
    let timer = 0
    let timestamp = 0
    let nextAction: IAction = () => {/* Empty action*/ }
    const throttleAction = () => {
        timer = 0
        nextAction()
    }

    return function (this: { delay: number }) {
        nextAction = action
        const now = Date.now()
        const elapsedTime = now - timestamp
        timestamp = now
        if (elapsedTime > delay) {
            throttleAction()
        } else if (timer === 0) {
            timer = window.setTimeout(throttleAction, delay - elapsedTime)
        }
    }
}