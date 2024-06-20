import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

interface Props extends SvgProps {
  color?: string
}

export const BookIcon = ({ color = '#fff', ...props }: Props) => (
  <Svg width={41} height={40} fill="none" {...props}>
    <Path
      stroke={color}
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20.5 11.515c-1.834-2.334-4.66-4.667-11.665-4.838A.82.82 0 0 0 8 7.499v20.163c0 .46.375.821.835.836 7.005.23 9.831 3.335 11.665 5.668m0-22.651c1.834-2.334 4.66-4.667 11.665-4.838A.812.812 0 0 1 33 7.49v20.17c0 .46-.375.822-.835.837-7.005.23-9.831 3.335-11.665 5.668m0-22.651v22.651"
    />
    <Path
      stroke={color}
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M32.559 10h3.774c.46 0 .834.373.834.833v21.732c0 .674-.795 1.122-1.411.849-1.325-.59-3.537-1.309-6.433-1.309C24.422 32.105 20.5 35 20.5 35s-3.922-2.895-8.823-2.895c-2.896 0-5.108.72-6.433 1.309-.616.273-1.41-.175-1.41-.849V10.833c0-.46.372-.833.833-.833H8.44"
    />
  </Svg>
)
