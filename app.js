const SerialPort = require('serialport')
const port = new SerialPort('/dev/serial0', {
  baudRate: 115200,
  autoOpen: false
})


const throttle = (fn, wait) => {
  let previouslyRun, queuedToRun;

  return function invokeFn(...args) {
      const now = Date.now();

      queuedToRun = clearTimeout(queuedToRun);

      if (!previouslyRun || (now - previouslyRun >= wait)) {
          fn.apply(null, args);
          previouslyRun = now;
      } else {
          queuedToRun = setTimeout(invokeFn.bind(null, ...args), wait - (now - previouslyRun));    
      }
  }
}; 

function debounce(callback, wait) {
  let timeout;
  return (...args) => {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => callback.apply(context, args), wait);
  };
}

port.open(function (err) {
  if (err) {
    return console.log('Error opening port: ', err.message)
  }

  // Because there's no callback to write, write errors will be emitted on the port:
  console.log('open')
})

// The open event is always emitted
port.on('open', function() {
  // open logic
  console.log('is open')
})


const handleDistance = (dist) => {
  console.log('>', dist, 'next shader');
}

const deb = debounce(handleDistance, 250);
// Switches the port into "flowing mode"
port.on('data', function (data) {
  const txt = data.toString();
  if (txt === "\n") {
    return;
  }

  const distance =  +txt.replace('E', '');

  if (distance < 400) {
    deb(distance);
  }
  
})

