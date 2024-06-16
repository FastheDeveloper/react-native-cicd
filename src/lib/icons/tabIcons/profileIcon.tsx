import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

interface Props extends SvgProps {
  color?: string
}

export const ProfileIcon = ({ color = '#fff', ...props }: Props) => (
  <Svg width={40} height={40} fill="none" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M3.333 20c0-9.205 7.462-16.666 16.667-16.666 9.205 0 16.667 7.461 16.667 16.666S29.205 36.667 20 36.667c-9.205 0-16.667-7.462-16.667-16.667ZM20 5C11.716 5 5 11.716 5 20c0 3.73 1.362 7.143 3.615 9.767a10.834 10.834 0 0 1 7.5-7.681 6.667 6.667 0 1 1 7.75.014 10.832 10.832 0 0 1 7.468 7.727A14.942 14.942 0 0 0 35 20c0-8.284-6.716-15-15-15Zm-.024 18.334H20.803a9.166 9.166 0 0 1 9.113 7.92A14.943 14.943 0 0 1 20 35c-3.83 0-7.325-1.435-9.976-3.798a9.167 9.167 0 0 1 9.106-7.869h.846Zm.044-1.667a5 5 0 1 0-.04 0h.04Z"
      clipRule="evenodd"
    />
  </Svg>
)
