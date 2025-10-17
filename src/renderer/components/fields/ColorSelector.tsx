import { Colorful, ColorResult, hsvaToHex, hexToHsva } from '@uiw/react-color';
import { useState } from 'react';

interface ColorSelectorProps {
  register: any; // used by react hook form
  id: string;
  initialColor: string; // Hex
}

function ColorSelector({ id, register, initialColor }: ColorSelectorProps) {
  const initialHsva = initialColor
    ? hexToHsva(initialColor)
    : { h: 0, s: 0, v: 0, a: 1 };
  const [hsva, setHsva] = useState(initialHsva);
  return (
    <div>
      <Colorful
        color={hsva}
        disableAlpha
        onChange={(color: ColorResult) => {
          setHsva(color.hsva);
        }}
      />
      <input
        id={id}
        {...register}
        readOnly
        value={hsvaToHex(hsva)}
        type="text"
      />
    </div>
  );
}

export default ColorSelector;
