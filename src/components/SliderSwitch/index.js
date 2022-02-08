import {SliderContainer, SliderBase, SliderRange, Labels, LabelsForBigSlides} from './styles'

const positionValues = {
  2: [2, 28],
  3: [2, 15, 28],
  4: [0, 15, 30, 45],
  6: [1, 22, 43, 62, 88, 114]
}

const clickRange = [[29,46], [46, 65], [65, 88], [88, 108], [108, 128], [128, 150]]

const getSliderPositionByClientX = (clientX) => {
    const value = clickRange.map((range,index) => {
        if(clientX >= range[0] && clientX <= range[1])
            return index;
    }).find((item) => item !== undefined)
    return value;
}

const SliderSwitch = ({ values, onChange, value, bigSlider, hideLabels, centered, useSlidePosition }) => {
  const toggle = value !== 0 && value !== undefined ? values.indexOf(value) : 0
  const position = positionValues[values.length]

  const centeredStyle = centered ? {margin: '0 auto'} : {}
  const bigSliderStyle = bigSlider ? {width: '126px'} : {}
  return (
    <>
        {!hideLabels && values.length === 2 && (
            <Labels>
                <label>{values && values[0]}</label>
            </Labels>
        )}
      <SliderContainer
          style={{...bigSliderStyle, ...centeredStyle}}
          onClick={(e) => {
            const toggleValue = useSlidePosition ? getSliderPositionByClientX(e.clientX)
                : toggle + 1 === values.length ? 0 : toggle + 1

            if (onChange) { onChange(values[toggleValue]) }
      }}
      >
        <SliderBase />
        <SliderRange style={{ left: `${position[toggle]}px` }} />
      </SliderContainer>
        {values.length === 6 && (
            <Labels style={{
                justifyContent: 'center',
                marginLeft: '4px'
            }}>
                {values.map(item => (
                    <LabelsForBigSlides key={item} onClick={() => onChange(item)}>{item}</LabelsForBigSlides>
                ))}
            </Labels>
        )}
        {!hideLabels && values.length === 2 && (
            <Labels>
                <label>{values && values[1]}</label>
            </Labels>
        )}
    </>

  )
}

export default SliderSwitch
