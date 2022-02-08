import { useState } from "react";
import 'react-rangeslider/lib/index.css'
import Slider from 'react-rangeslider'
import * as skins from 'react-rotary-knob-skin-pack'
import { Knob } from 'react-rotary-knob'

import circlesBottom from '../../assets/screw-circles-bottom.svg'
import passerineIcon from '../../assets/passerine-icon.svg'

import {
    DeviceLayout,
    RightCircleBottom,
    LeftCircleBottom,
    DeviceName,
    DeviceContent,
    DeviceSection,
    DeviceColumn,
    Row,
    GreenScreen,
    GreenScreenContainer,
    DeviceSelect,
    Control,
    KnobContainer,
    SlidersContainer,
    Column,
    RowDivider, Divider
} from './styles'
import SliderSwitch from "../../components/SliderSwitch";
import {intervals} from "../../midi";


const Screws = () => (
  <>
    <RightCircleBottom src={circlesBottom} />
    <LeftCircleBottom src={circlesBottom} />
  </>
)

const Layout = ({
    transformValue, setTransformValue,
    interval, setInterval,
    deviceMode, setDeviceMode,
    playMode, setPlayMode,
    onSelectMidiInput,
    onSelectMidiOutput,
    currentMidiInput,
    currentMidiOutput,
    midiInputs,
    midiOutputs,
    intervalProbabilities, setIntervalProbabilities,
    probabilityDivisor,setProbabilityDivisor,
    intervalValues
    }) => {

  return (
    <DeviceLayout>
      <Screws />
      <DeviceName>
        <div>
          <img src={passerineIcon} alt='passerine-icon' />
          <h1>PASSERINE</h1>
        </div>
        <h3>
          real time <br />stochastic transposer
        </h3>
      </DeviceName>
      <DeviceContent>
        <DeviceSection>
          <RowDivider>
            <DeviceColumn>
              <Row style={{ height: '96px' }}>
                <Column>
                  <h2>MIDI IN</h2>
                  <GreenScreenContainer>
                    <GreenScreen
                      style={{ width: '93px' }}
                    >{currentMidiInput ? midiInputs[currentMidiInput].name : 'MIDI IN'}
                    </GreenScreen>
                    <DeviceSelect
                        disabled={!currentMidiOutput}
                        onChange={onSelectMidiInput}
                    >
                        <option>No device</option>
                        {midiInputs && midiInputs.map(({id, name}, index) => {
                            return <option value={index} key={id}>{name}</option>
                        })}
                    </DeviceSelect>
                  </GreenScreenContainer>
                </Column>
                <Column>
                  <h2>MIDI OUT</h2>
                    <GreenScreenContainer>
                        <GreenScreen
                            style={{ width: '93px' }}
                        >{currentMidiOutput ? midiOutputs[currentMidiOutput].name : 'MIDI OUT'}
                        </GreenScreen>
                        <DeviceSelect
                            onChange={onSelectMidiOutput}
                        >
                            <option>No device</option>
                            {midiOutputs && midiOutputs.map(({id, name}, index) => (<option value={index} key={id}>{name}</option>))}
                        </DeviceSelect>
                    </GreenScreenContainer>
                </Column>
              </Row>
              <Row style={{ marginBottom: 0 }}>
                <Control>
                  <h2>TRANSFORM</h2>
                  <SliderSwitch values={intervalValues} onChange={(value) => {
                    window.transformValue = intervalValues.indexOf(value)
                    setTransformValue(value);
                  }}
                  value={transformValue}
                  bigSlider
                  useSlidePosition
                  />
                </Control>
                <Control>
                  <h2>INTERVAL</h2>
                  <KnobContainer>
                    <Knob
                        unlockDistance={0}
                        onChange={(val) => {
                          setInterval(Math.floor(val))
                          window.currentInterval = Math.floor(val)
                        }}
                        min={0}
                        max={10}
                        value={interval}
                        skin={skins.s13}
                        preciseMode={false}
                    />
                    <span>{intervals[interval]}</span>
                  </KnobContainer>
                </Control>
                  <Control style={{marginLeft: '22px'}}>
                      <h2 style={{ marginBottom: '20px'}}>MONO/POLY</h2>
                      <SliderSwitch values={['MONO','POLY']} onChange={value => setPlayMode(value)} value={playMode} hideLabels centered />
                  </Control>
              </Row>
            </DeviceColumn>
            <DeviceColumn style={{marginLeft: '25px'}}>
              <h2>PROBABILITY</h2>
              <Row style={{height: 'unset', marginTop: '3px'}}>
              <SlidersContainer>
                  {intervalValues.map((item, index) => {
                      const itemsToSum = probabilityDivisor.filter((item, currentIndex) => index !== currentIndex)
                      const max = 6 - (itemsToSum.reduce((a, b) => a + b));
                      return (
                          <div className='slider-vertical'>
                              <label style={{bottom: '5px', position: 'relative'}}>{intervalValues[index]}</label>
                              <Slider
                                  min={0}
                                  max={6}
                                  step={0.2}
                                  tooltip={false}
                                  value={probabilityDivisor[index]}
                                  orientation='vertical'
                                  onChange={(value) => {

                                      const newValue = value > max ? max : value

                                      const newProbabilities = intervalProbabilities;
                                      newProbabilities[index] = (newValue / 6);
                                      const newProbabilityDivisor = probabilityDivisor;
                                      newProbabilityDivisor[index] = newValue;
                                      setProbabilityDivisor([...newProbabilityDivisor])
                                      setIntervalProbabilities([...newProbabilities])
                                  }}
                              />
                              <label>{(intervalProbabilities[index] * 100).toFixed(0)}%</label>
                          </div>
                      )
                  })
                  }
            </SlidersContainer>
              </Row>
              <Row
                style={{
                  justifyContent: 'center',
                  marginTop: '2px',
                  alignItems: 'center'
                }}
              >
                <SliderSwitch values={['PLAY','GENERATE']} onChange={value => setDeviceMode(value)} value={deviceMode} />
              </Row>
            </DeviceColumn>
          </RowDivider>
        </DeviceSection>
      </DeviceContent>
    </DeviceLayout>


  )
}

export default Layout
