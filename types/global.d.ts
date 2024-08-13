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
      language: string;
      type: typeof MESSAGE_TYPES.complete;
      quizId: number;

      data: {
        result: object;
      };
    }

    interface Connect {
      language: string;
      type: typeof MESSAGE_TYPES.connect;
      quizId: number;

      data: {
        userAgent: string,
        clientId?: string,
        pathname: string,
        platform: Platform,
        theme: 'auto' | 'dark' | 'light',
        timezone: string,
      };
    }

    interface Identity {
      clientId: string;
      language: string;
      type: typeof MESSAGE_TYPES.identity;
      quizId: number;

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
      language: string;
      type: typeof MESSAGE_TYPES.message;
      quizId: number;

      data: {
        text: string;
      };
    }

    interface Progress {
      clientId: string;
      language: string;
      type: typeof MESSAGE_TYPES.progress;
      quizId: number;

      data: {
        answer: object;
        current: number;
        page: string;
        total: number;
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

  type Block = (Blocks.Header | Blocks.CheckboxGroup | Blocks.Image | Blocks.RadioGroup);
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

    interface Image {
      type: typeof BLOCK_TYPES.IMAGE;
      src: string;
      label: string;
      mimetype: string;
      size: string;
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

  interface PageConfig {
    formData: BlocksList;
  }
}
