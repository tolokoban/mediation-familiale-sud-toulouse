import Content from './app/content'
import Splash from './app/splash/splash'
import './index.css'
import "./fonts.css"
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
    await Splash.loadAssetsAndVanish(
        ["./welcome.webp", "./trombine.webp"],
        SPLASH_TIMEOUT
    )
}

// tslint:disable-next-line: no-floating-promises
start()

serviceWorker.unregister()
