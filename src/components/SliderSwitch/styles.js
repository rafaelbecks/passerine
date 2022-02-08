import styled from 'styled-components'

const SliderContainer = styled.div`
    width: 40px;
    height: 23px;
    margin: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
`

const SliderBase = styled.div`
    width: 100%;
    background: #000;
    height: 6px;
`

const SliderRange = styled.div`
    height: 100%;
    width: 4px;
    background: #C4C4C4;
    position: absolute;
    border-right: 3px solid #000;
    border-left: 3px solid #000;
`

const Labels = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0px;
    label{
        color: #fff;
        font-size: 12px;
        font-family: 'Futura';
        cursor:pointer;
    }
`

const LabelsForBigSlides = styled.label`
    color: #fff;
    font-size: 12px;
    font-family: 'Futura';
    margin-right: 13px;
    `

export { SliderContainer, SliderBase, SliderRange, Labels, LabelsForBigSlides }
