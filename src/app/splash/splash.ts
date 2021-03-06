import "./splash.css"

export default {
    async loadAssetsAndVanish(assets: string[], minTimeToStay: number) {
        const splash = document.getElementById("splash")
        if (!splash) return

        // tslint:disable-next-line: invalid-void
        const promises: Array<Promise<HTMLImageElement | void>> = [
            sleep(minTimeToStay),
            ...assets.map(loadImage)
        ]
        await Promise.all(promises)
        splash.classList.add("vanish")
    }
}

async function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>(resolve => {
        const img = new Image()
        img.src = src
        img.onload = () => { resolve(img) }
        img.onerror = ex => {
            console.error("Unable to load image: ", src)
            console.error(ex)
        }
    })
}

async function sleep(duration: number): Promise<void> {
    return new Promise<void>(resolve => {
        window.setTimeout(resolve, duration)
    })
}