import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

interface Props extends SvgProps {
  color?: string
}

export const WalletIcon = ({ color = '#fff', ...props }: Props) => (
  <Svg width={41} height={40} fill="none" {...props}>
    <Path fill={color} d="M28.583 21.667a1.667 1.667 0 1 0 0-3.334 1.667 1.667 0 0 0 0 3.334Z" />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M3.583 27.5c0 2.258 1.745 4.167 3.992 4.167h23.684c2.246 0 3.991-1.909 3.991-4.167V25h.833c.46 0 .834-.373.834-.833v-8.334a.833.833 0 0 0-.834-.833h-.833v-2.5c0-2.258-1.745-4.166-3.991-4.166H7.575c-2.247 0-3.992 1.908-3.992 4.166v15Zm1.667-15c0-1.424 1.083-2.5 2.325-2.5h1.008v20H7.575c-1.242 0-2.325-1.076-2.325-2.5v-15Zm20 7.5a3.333 3.333 0 0 1 3.333-3.333h6.667v6.666h-6.667A3.333 3.333 0 0 1 25.25 20Zm-1.667 0a5 5 0 0 1 5-5h5v-2.5c0-1.424-1.082-2.5-2.324-2.5H10.25v20h21.009c1.242 0 2.324-1.076 2.324-2.5V25h-5a5 5 0 0 1-5-5Z"
      clipRule="evenodd"
    />
  </Svg>
)
