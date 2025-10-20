import { Colorful, ColorResult, hsvaToHex, hexToHsva } from '@uiw/react-color';
import { useState } from 'react';

interface ColorSelectorProps {
  id: string;
  initialColor: string; // Hex
  field: any; // controlled react hook form
}

// Needs to be wrapped in react hook form Controller
// because input value changes via react state
function ColorSelector({ id, field, initialColor }: ColorSelectorProps) {
  const initialHsva = initialColor
    ? hexToHsva(initialColor)
    : { h: 0, s: 0, v: 0, a: 1 };
  const [hsva, setHsva] = useState(initialHsva);
  const { onChange, value } = field;
  return (
    <div>
      <Colorful
        color={hsva}
        disableAlpha
        onChange={(color: ColorResult) => {
          setHsva(color.hsva);
          onChange(hsvaToHex(hsva));
        }}
      />
      <input id={id} readOnly value={value} type="text" />
    </div>
  );
}

export default ColorSelector;
