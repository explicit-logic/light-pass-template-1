import type { TYPES as BLOCK_TYPES } from '@/constants/block';
import type { TYPES as QUESTION_TYPES } from '@/constants/question';

declare global {
  type Message = (Messages.Complete | Messages.Connect | Messages.Identity | Messages.Init | Messages.Message | Messages.Progress);

  type Platform  = {
    browser: string,
    os: string,
    type: string,
    version: string,
  };

  namespace Messages {

    interface Complete {
      clientId: string;
      type: typeof MESSAGE_TYPES.complete;

      data: {
        result: object;
      };
    }

    interface Connect {
      type: typeof MESSAGE_TYPES.connect;

      data: {
        userAgent: string,
        clientId?: string,
        locale: string,
        pathname: string,
        platform: Platform,
        theme: 'auto' | 'dark' | 'light',
        timeZone: string,
      };
    }

    interface Identity {
      clientId: string;
      type: typeof MESSAGE_TYPES.identity;

      data: {
        email: string;
        group?: string;
        name?: string;
        context: {
          slugs: string[];
        }
      };
    }

    interface Init {
      type: typeof MESSAGE_TYPES.init;

      data: {
        userAgent: string,
        clientId: string,
        locale: string,
        platform: Platform,
        theme: 'auto' | 'dark' | 'light',
        timeZone: string,
      };
    }

    interface Message {
      clientId: string;
      type: typeof MESSAGE_TYPES.message;

      data: {
        text: string;
      };
    }

    interface Progress {
      clientId: string;
      type: typeof MESSAGE_TYPES.progress;

      data: {
        answer: object;
        page: string;
      };
    }
  }

  type Question = (Questions.MultipleChoice | Questions.MultipleResponse);

  namespace Questions {
    interface MultipleChoice {
      id: string;
      type: typeof QUESTION_TYPES.MC;

      items: Tokens.ListItem[];
    }

    interface MultipleResponse {
      id: string;
      type: typeof QUESTION_TYPES.MR;

      items: Tokens.ListItem[];
    }
  }

  type QuestionsList = Question[];

  type Block = (Blocks.Header | Blocks.CheckboxGroup | Blocks.RadioGroup);
  type InteractionBlock = (Blocks.CheckboxGroup | Blocks.RadioGroup);

  type BlocksList = Block[];

  namespace Blocks {
    interface Option {
      label: string;
      value: string;
      selected: boolean;
    }

    interface Header {
      type: typeof BLOCK_TYPES.HEADER;
      subtype: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      label: string;
    }

    interface CheckboxGroup {
      type: typeof BLOCK_TYPES.CHECKBOX_GROUP;
      label: string;
      name: string;
      values: Option[];
    }

    interface RadioGroup {
      type: typeof BLOCK_TYPES.RADIO_GROUP;
      label: string;
      name: string;
      values: Option[];
    }
  }
}
