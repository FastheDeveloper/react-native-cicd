import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const calendarIcon = (props: SvgProps) => (
  <Svg width={20} height={21} fill="none" {...props}>
    <Path
      fill="grey"
      fillRule="evenodd"
      fillOpacity={0.87}
      d="M5.5 0a1 1 0 0 1 1 1v1h7V1a1 1 0 1 1 2 0v1.025A5 5 0 0 1 20 7v9a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5V7a5 5 0 0 1 4.5-4.975V1a1 1 0 0 1 1-1ZM2.17 6h15.66A3.001 3.001 0 0 0 15 4H5a3.001 3.001 0 0 0-2.83 2ZM18 8H2v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8Zm-3.293 1.793a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-2.5-2.5a1 1 0 1 1 1.414-1.414L9 14.086l4.293-4.293a1 1 0 0 1 1.414 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default calendarIcon;
