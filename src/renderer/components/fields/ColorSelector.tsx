import { Colorful, ColorResult, hsvaToHex } from '@uiw/react-color';
import { useState } from 'react';

interface ColorSelectorProps {
  register: any; // used by react hook form
  id: string;
}

function ColorSelector({ id, register }: ColorSelectorProps) {
  const [hsva, setHsva] = useState({ h: 0, s: 0, v: 68, a: 1 });
  return (
    <div>
      <Colorful
        color={hsva}
        disableAlpha
        onChange={(color: ColorResult) => {
          setHsva(color.hsva);
        }}
      />
      <input id={id} {...register} disabled value={hsvaToHex(hsva)} />
    </div>
  );
}

export default ColorSelector;
