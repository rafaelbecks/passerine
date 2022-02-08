import WebMidi from 'webmidi'
import { Note } from '@tonaljs/tonal'

const intervals = ['m2','M2','m3', '4P', 'd5', '5P', 'm6','M6', 'm7','M7'];

const transposePattern = [-1, 0, 'interval.0', 1, 'interval.1', 2]

const createDistribution = (array, weights, size) => {
    const distribution = [];
    const sum = weights.reduce((a, b) => a + b);
    for (let i = 0; i < array.length; ++i) {
        const count = (weights[i] / sum) * size;
        for (let j = 0; j < count; ++j) {
            distribution.push(i);
        }
    }
    return distribution;
};

const randomIndex = distribution => {
    const index = Math.floor(distribution.length * Math.random());  // random index
    return distribution[index];
};

const initMidiOutputs = async () =>
  new Promise((resolve, reject) => {
    WebMidi.enable(function (err) {
      if (err) {
        reject(err)
      }
      resolve(WebMidi.outputs)
    })
  })

const initMidiInputs = async () =>
    new Promise((resolve, reject) => {
      WebMidi.enable(function (err) {
        if (err) {
          reject(err)
        }
        resolve(WebMidi.inputs)
      })
    })

const transpose = (note) => {
    const { name, octave } = note;
   if(typeof transposePattern[window.transformValue] === 'number') {
       return `${name}${octave + transposePattern[window.transformValue]}`
   } else {
       const octaveToSum = Number(transposePattern[window.transformValue].split('.')[1])
       return Note.transpose(`${name}${octave + octaveToSum}`, intervals[window.currentInterval]);
   }
}

let noteToPlay;

const sendTransposedNote = (midiEvent, currentMidiOutput, midiOutputs) => {
    const { note, rawVelocity } = midiEvent
    noteToPlay= transpose((note));
    if(currentMidiOutput)
        if(window.playMode === 'POLY' && window.transformValue !== 1){
            midiOutputs[currentMidiOutput].playNote(`${note.name}${note.octave}`, 1, { rawVelocity: true, velocity: rawVelocity, duration: 1000})
        }
        midiOutputs[currentMidiOutput].playNote(noteToPlay, 1, { rawVelocity: true, velocity: rawVelocity, duration: 1000})
}

const stopTransposedNote = (midiEvent, currentMidiOutput, midiOutputs) => {
    const { note } = midiEvent
    if(currentMidiOutput) {
        if(window.playMode === 'POLY'){
            midiOutputs[currentMidiOutput].stopNote(`${note.name}${note.octave}`, 1)
        }

        midiOutputs[currentMidiOutput].stopNote(noteToPlay,1)
    }
}

export { initMidiInputs, initMidiOutputs, sendTransposedNote, stopTransposedNote, intervals, createDistribution, randomIndex }
