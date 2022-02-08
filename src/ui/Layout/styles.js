import styled from 'styled-components'
import texture from '../../assets/cartographer.png'

const DeviceLayout = styled.div`
    width: 606px;
    background: url(${texture}), #375A8E;
    background-blend-mode: overlay;
    position: relative;
    padding: 20px 24px 34px 24px;
    `

const RightCircleBottom = styled.img`
    position: absolute;
    bottom: -7px;
    margin: 16px;
    right: 0;
`

const LeftCircleBottom = styled.img`
    position: absolute;
    bottom: -7px;
    margin: 16px;
    left: 0;
`

const DeviceName = styled.div`
  color: #fff;
  margin: 0;
  display:flex;
  justify-content: space-between;
  font-family: 'Futura';
  align-items: center;
  div {
      display:flex;
      align-items:center;
  }
  h1 {
    font-weight: 100;
    font-size: 26px;
    margin-left: 10px;
    letter-spacing: 0.06em;
  }

  h3 {
    font-weight: 100;
    font-size: 16px;
    text-align: right;
    letter-spacing: 0.03em;
  }
`

const DeviceSection = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid #ffffffa8;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 8px 8px 8px 22px;
    h2 {
        font-family: 'Futura';
        font-size: 15px;
        font-weight: 100;
        color: #fff;
        margin-bottom: 10px;
        margin-top: 0;
    }
`

const DeviceContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const greenScreenStyles = `height: 38px;
    width: fit-content;
    min-width: 20px;
    padding: 0px 10px;
    display:flex;
    text-transform: uppercase;
    justify-content: center;
    align-items:center;
    background: #162340;
    margin: 0;
    font-family: 'Monda';
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    color: #FAFFBC;
    border: none;
    text-align: center;`

const GreenScreen = styled.div`${greenScreenStyles}`
const GreenScreenInput = styled.input`${greenScreenStyles}`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    margin: 15px 0px 0px 0px;
    height: 46px;
`

const RowDivider = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    align-items: baseline;
    margin: 0;
    position:relative;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-around;
    align-items: center;
`

const Control = styled.div`
    height: 88px;
    width: 60%;
`

const GreenScreenContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.row ? 'row' : 'column'};
    align-items: center;
`

const GridScreen = styled.img`
    position: absolute;
    width: 304px !important;
    top: 317px;
    height: 336px;
    mix-blend-mode: screen`

const KnobContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    z-index: 30;
    span {
      color: #fff;
      font-size: 9px;
      font-family: Futura;
      margin-top: 5px;
    }
`

const DeviceColumn = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SlidersContainer = styled.div`
    margin: 0px 0px 9px 0px;
    display: flex;
    label {
      font-family: 'Futura';
      color: #fff;
      font-size: 11px;
    }
`
const DeviceSelect = styled.select`
    opacity: 0;
    position: relative;
    bottom: 39px;
    width: 170px;
    height: 38px;
`

const KnobSteps = styled.div`
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='white' stroke-width='13' stroke-dasharray='1%2c 13' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");
    border-radius: 100px;
    width: 71px;
    height: 71px;
    position: absolute;
    top: 33px;
`

const Divider = styled.div`
  border-right: 1px solid #fff;
`

export {
  DeviceLayout,
  RightCircleBottom,
  LeftCircleBottom,
  DeviceSection,
  DeviceName,
  DeviceContent,
  GreenScreen,
  Row,
  Control,
  GreenScreenContainer,
  KnobContainer,
  DeviceColumn,
  SlidersContainer,
  DeviceSelect,
  Column,
  RowDivider,
  Divider,
  GreenScreenInput,
  KnobSteps,
}
