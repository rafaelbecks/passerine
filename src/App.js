import { useState, useEffect } from 'react'

import './App.css'
import Layout from './ui/Layout'
import {initMidiInputs, initMidiOutputs, sendTransposedNote, stopTransposedNote, createDistribution, randomIndex} from "./midi";

window.transformValue = 1;
window.currentInterval = 5;

function App () {
    const [midiInputs, setMidiInputs] = useState(null)
    const [midiOutputs, setMidiOutputs] = useState(null)
    const [currentMidiInput, setCurrentMidiInput] = useState(null)
    const [currentMidiOutput, setCurrentMidiOutput] = useState(null)
    const [transformValue, setTransformValue] = useState(8);
    const [interval, setInterval] = useState(5);
    const [deviceMode, setDeviceMode] = useState('PLAY');
    const [playMode, setPlayMode] = useState('MONO');
    const [intervalProbabilities, setIntervalProbabilities] = useState([0,0,0,0,0,0])
    const [probabilityDivisor, setProbabilityDivisor] = useState([0,0,0,0,0,0])

    const intervalValues = [16, 8, 6,4,2.5,2];

    const onSelectMidiInput = (e) => {
    if(e.target.value === '-1') return

      if(currentMidiInput){
          midiInputs[currentMidiInput].removeListener()
      }

      setCurrentMidiInput(e.target.value)
      const midiInput = midiInputs[e.target.value]
      midiInput.addListener('noteon', 'all',(e) => {
          if(window.deviceMode === 'GENERATE'){
              const distribution = createDistribution(intervalValues, window.intervalProbabilities, 100)
              const generatedTransformValue = intervalValues[randomIndex(distribution)]
              if(generatedTransformValue){
                  window.transformValue = intervalValues.indexOf(generatedTransformValue)
                  setTransformValue(generatedTransformValue)

              }

          }
          sendTransposedNote(e,currentMidiOutput,midiOutputs);
      })
      midiInput.addListener('noteoff', 'all', (e) => {
          stopTransposedNote(e,currentMidiOutput,midiOutputs)
      })
  }

    const onSelectMidiOutput = (e) => {
        setCurrentMidiOutput(e.target.value)
    }

    useEffect(async () => {
      const [midiInputs,midiOutputs] = await Promise.all([initMidiInputs(), initMidiOutputs()]);
        setMidiInputs(midiInputs)
        setMidiOutputs(midiOutputs)
  },[])


    window.deviceMode = deviceMode;
    window.intervalProbabilities = intervalProbabilities;
    window.playMode = playMode
  return (
    <div className='App'>
      <Layout
        // midiDevices={midiDevices}
        onSelectMidiInput={onSelectMidiInput}
        onSelectMidiOutput={onSelectMidiOutput}
        currentMidiInput={currentMidiInput}
        currentMidiOutput={currentMidiOutput}
        midiInputs={midiInputs}
        midiOutputs={midiOutputs}
        transformValue={transformValue}
        setTransformValue={setTransformValue}
        interval={interval}
        setInterval={setInterval}
        deviceMode={deviceMode}
        setDeviceMode={setDeviceMode}
        playMode={playMode}
        setPlayMode={setPlayMode}
        intervalProbabilities={intervalProbabilities}
        setIntervalProbabilities={setIntervalProbabilities}
        probabilityDivisor={probabilityDivisor}
        setProbabilityDivisor={setProbabilityDivisor}
        intervalValues={intervalValues}
      />
    </div>
  )
}

export default App
