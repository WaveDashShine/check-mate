export interface ICheck {
  _id: string;
  name: string;
  note: string;
  isEnabled: boolean;
  frequency: number;
  browserConfig: {
    url: string;
    checkText: boolean;
    checkHtml: boolean;
    checkScreenshot: boolean;
    locator: string;
  };
  alertHistory: string[];
  tags: string[];
}

export const CheckKeys = {
  _id: 'id',
  name: 'name',
  note: 'note',
  isEnabled: 'isEnabled',
  frequency: 'frequency',
  browserConfig: {
    url: 'browserConfig.url',
    checkText: 'browserConfig.checkText',
    checkHtml: 'browserConfig.checkHtml',
    checkScreenshot: 'browserConfig.checkScreenshot',
    locator: 'browserConfig.locator',
  },
  alertHistory: 'alertHistory',
  tags: 'tags',
} as const satisfies Record<keyof ICheck, string | object>;

export interface IAlert {
  _id: string;
  html: string;
  screenshot: string;
  text: string;
  timestamp: string;
}

export interface ITag {
  _id: number;
  name: string;
  color: string;
  note: string;
}

export const TagColor = {
  Red: '#FF0000',
  Green: '#00FF00',
  Blue: '#0000FF',
  // TODO: more colors or a color picker
} as const;
