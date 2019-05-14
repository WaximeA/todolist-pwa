import { LitElement, html, css } from 'lit-element';
// import AppCard from './components/card/card';

export default class AppConnectivity extends LitElement {
  constructor() {
    super();
    this.tStart = null;
    this.tEnd = null;
    this.image = new Image();
    this.counter = 0;
    this.arrTimes = [];
    this.abortFallback = false;

    this.timeToCount = 3;
    this.threshold = 3000;
    this.offlineTimeout = 3000
  }

  static get properties() {
    return {
      tStart: {type: Number},
      tEnd: {type: Number},
      image: {type: Image},
      counter: {type: Number},
      arrTimes: {type: Array},
      abortFallback: {type: Boolean},

      timeToCount: {type: Number},
      threshold: {type: Number},
      offlineTimeout: {type: Number}
    }
  }

  firstUpdated() {
    this.checkConnectivity();
  }

  changeConnectivity(state) {
    const event = new CustomEvent('connectivity-changed', {
      detail: state
    });

    document.dispatchEvent(event);
  }

  checkConnectivity() {
    // Test if navigator got connexion (null = true)
    if (navigator.onLine) {
      this.changeConnectivity(true);
    } else {
      setTimeout(() => {
        this.changeConnectivity(false);
      }, this.offlineTimeout);
    }

    // Test de la connectivité si jamais elle change
    window.addEventListener('online', e => {
      this.changeConnectivity(true);
    });

    window.addEventListener('offline', e => {
      setTimeout(() => {
        this.changeConnectivity(false);
      }, this.offlineTimeout);
    });

    this.timeoutFallback(this.threshold);
    this.checkLatency(this.timeToCount, this.offlineTimeout, average => this.handleLatency(average, this.threshold));
    setInterval(() => {
      this.reset();
      this.checkLatency(this.timeToCount, this.offlineTimeout, average => this.handleLatency(average, this.threshold));
    }, 6000);
  }

  checkLatency(timeToCount, offlineTimeout, callback){
    this.tStart = new Date().getTime();
    if (this.counter < timeToCount){
      this.image.src = "https://www.google.com/images/phd/px.gif?t=" + this.tStart;
      // Get image loading time
      this.image.onload = function(e){
        this.abortFallback = true
        this.tEnd = new Date().getTime();
        let time = this.tEnd - this.tStart;
        this.arrTimes.push(time);
        this.checkLatency(timeToCount, offlineTimeout, callback);
        this.counter++
      };
      this.image.offline = function () {
        setTimeout(() => {
          this.changeConnectivity(false);
        }, offlineTimeout)
      }
    } else {
      const sum = this.arrTimes.reduce((a, b) => a + b);
      const average = sum / this.arrTimes.length;
      callback(average)
    }
  }

  handleLatency(average, threshold) {
    const isConnectedFast = average <= threshold;

    if (!isConnectedFast) return this.changeConnectivity(false);

    this.changeConnectivity(true);
  }

  reset() {
    this.arrTimes =  [];
    this.counter = 0;
  }

  timeoutFallback(threshold) {
    setTimeout(() => {
      if (!this.abortFallback) {
        console.log('Connectivity too slow...');
        this.changeConnectivity(false);
      }
    }, threshold + 1);

  }

}

customElements.define('check-connectivity', AppConnectivity);