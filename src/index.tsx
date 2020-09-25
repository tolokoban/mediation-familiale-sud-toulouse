import Hash from './app/hash'
import Splash from './app/splash/splash'
import Content from './app/content'
import './index.css'
import "./fonts/fonts.css"
import "./fonts/courgette/courgette.css"
import * as serviceWorker from './serviceWorker'

// Temps minimal d'affichage du Splash screen.
const SPLASH_TIMEOUT = 1200

async function start() {
    // Load welcome image then start!
    const welcomePhoto = document.getElementById("welcome-photo")
    if (welcomePhoto) {
        welcomePhoto.style.backgroundImage = "url(./welcome.webp)"
    }
    Content.applyContent()
    decryptEMail()
    Hash.initialize()
    await Splash.loadAssetsAndVanish(
        ["./welcome.webp", "./trombine.webp"],
        SPLASH_TIMEOUT
    )
}

// tslint:disable-next-line: no-floating-promises
start()

function decryptEMail() {
    const email = "n/wfsobz/ngAhnbjm/dpn".split("").map(c => String.fromCharCode(c.charCodeAt(0) - 1)).join("")
    const anchor = document.getElementById("email")
    if (anchor) {
        anchor.setAttribute("href", `mailto:${email}`)
    }
}

serviceWorker.unregister()
