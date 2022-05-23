import { Notify } from "quasar";

const createMessage = ({
  message,
  caption,
  color,
  avatar,
  icon,
  actions,
  multiLine,
  timeout,
  position,
}) => {
  const messageOptions = {
    message,
    color: color || "primary",
    caption: caption || null,
    avatar: avatar || null,
    icon: icon || null,
    actions: actions || null,
    multiLine: multiLine !== undefined ? multiLine : true,
    timeout: timeout !== undefined ? timeout : 5000,
    position: position || "bottom",
    html: false,
    progress: true,
  };

  Notify.create(messageOptions);
};

const addMsg = (msg) => {
  createMessage(msg);
};

const addError = (text) => {
  createMessage({
    message: text,
    color: "negative",
    timeout: 0,
    actions: [
      {
        label: "OK",
        color: "white",
        multiLine: false,
        handler: () => {
          /* ... */
        },
      },
    ],
  });
};

const addInfo = (text) => {
  createMessage({
    message: text,
    color: "positive",
  });
};

export { addMsg, addError, addInfo };
