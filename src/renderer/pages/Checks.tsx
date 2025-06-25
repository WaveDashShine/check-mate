import 'src/renderer/pages/Checks.css';
import {useEffect, useState} from "react";

function testPuppeteer() { // stub - need to pass a config object
  const containerText = window.electron.autoBrowser.check('https://electron-react-boilerplate.js.org/')
  console.log('containerText', containerText)
}

function Checks() {
  return (
    <div>
      Checks
      <button onClick={testPuppeteer}>
        Puppeteer Checks
      </button>
    </div>
  )
}

export default Checks;
