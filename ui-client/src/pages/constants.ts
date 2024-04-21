import startImage from "../assets/headset-start.png";
import endImage from "../assets/celebrate.png";
import track1 from "../assets/track-1.png";
import track2 from "../assets/track-2.png";
import track3 from "../assets/track-3.png";
import track4 from "../assets/track-4.png";

export const STATE = { START: "START", FOCUS: "FOCUS", BREAK: "BREAK", LONG_BREAK: "LONG_BREAK" };
export const STATE_TIME = { FOCUS: 10, BREAK: 3, LONG_BREAK: 7 };
// { FOCUS: 25 * 60, BREAK: 5 * 60, LONG_BREAK: 25 * 60 };

export const SOUND_TYPE = { BELL: "BELL", END: "END" };

export const STAGE = [
  {
    state: STATE.START,
    time: STATE_TIME.FOCUS,
    image: startImage,
    title: "Start Pomodoro",
    description: "Click the button to start the Pomodoro timer.",
    sound: SOUND_TYPE.BELL,
    getFeedback: false,
  },
  {
    state: STATE.FOCUS,
    time: STATE_TIME.FOCUS,
    image: startImage,
    title: "Focus Time!",
    description: "Get to work! You'll have a short break after this session.",
    sound: SOUND_TYPE.END,
    getFeedback: false,
  },
  {
    state: STATE.BREAK,
    time: STATE_TIME.BREAK,
    image: track1,
    title: "Break Time!",
    description: "Celebrate your hard work with a short break.",
    sound: SOUND_TYPE.BELL,
    getFeedback: true,
  },
  {
    state: STATE.FOCUS,
    time: STATE_TIME.FOCUS,
    image: startImage,
    title: "Focus Time!",
    description: "If you pause, you'll have to start this focus session over.",
    sound: SOUND_TYPE.END,
    getFeedback: false,
  },
  {
    state: STATE.BREAK,
    time: STATE_TIME.BREAK,
    image: track2,
    title: "Break Time!",
    description: "Celebrate your hard work with a short break.",
    sound: SOUND_TYPE.BELL,
    getFeedback: true,
  },
  {
    state: STATE.FOCUS,
    time: STATE_TIME.FOCUS,
    image: startImage,
    title: "Focus Time!",
    description: "Wear your headset so we can create your personal focus model.",
    sound: SOUND_TYPE.END,
    getFeedback: false,
  },
  {
    state: STATE.BREAK,
    time: STATE_TIME.BREAK,
    image: track3,
    title: "Break Time!",
    description: "Celebrate your hard work with a short break.",
    sound: SOUND_TYPE.BELL,
    getFeedback: true,
  },
  {
    state: STATE.FOCUS,
    time: STATE_TIME.FOCUS,
    image: startImage,
    title: "Focus Time!",
    description: "You're almost done! Keep going!",
    sound: SOUND_TYPE.END,
    getFeedback: false,
  },
  {
    state: STATE.LONG_BREAK,
    time: STATE_TIME.LONG_BREAK,
    image: track4,
    title: "Congrats You Finished a Series!",
    description: "Celebrate your hard work with a LONG break.",
    sound: SOUND_TYPE.BELL,
    getFeedback: true,
  },
  {
    state: STATE.LONG_BREAK,
    time: 0,
    image: endImage,
    title: "Congrats You Finished a Series!",
    description: "Celebrate your hard work with a LONG break.",
    sound: null,
  },
];

const GOOD_COLOR = "#00FF00";
const NEUTRAL_COLOR = "#FFFF00";
const BAD_COLOR = "#FF0000";

export const EMOTION_COLORS = {
  Excitement: GOOD_COLOR,
  Concentration: GOOD_COLOR,
  Determination: GOOD_COLOR,
  Contentment: GOOD_COLOR,
  Interest: GOOD_COLOR,
  Satisfaction: GOOD_COLOR,
  Pride: GOOD_COLOR,
  Admiration: GOOD_COLOR,
  Curiosity: GOOD_COLOR,
  Realization: GOOD_COLOR,
  Amusement: GOOD_COLOR,
  Joy: GOOD_COLOR,
  Love: GOOD_COLOR,
  Surprise_positive: GOOD_COLOR,
  Triumph: GOOD_COLOR,
  Adoration: GOOD_COLOR,
  Anger: BAD_COLOR,
  Anxiety: BAD_COLOR,
  Boredom: BAD_COLOR,
  Confusion: BAD_COLOR,
  Doubt: BAD_COLOR,
  Distress: BAD_COLOR,
  Fear: BAD_COLOR,
  Frustration: BAD_COLOR,
  Guilt: BAD_COLOR,
  Horror: BAD_COLOR,
  Sadness: BAD_COLOR,
  Shame: BAD_COLOR,
  Tiredness: BAD_COLOR,
  Disappointment: BAD_COLOR,
  Disgust: BAD_COLOR,
  Embarrassment: BAD_COLOR,
  Envy: BAD_COLOR,
  Contempt: BAD_COLOR,
  Pain: BAD_COLOR,
  Distraction: BAD_COLOR,
  Aesthetic_Appreciation: NEUTRAL_COLOR,
  Awkwardness: NEUTRAL_COLOR,
  Contemplation: NEUTRAL_COLOR,
  Craving: NEUTRAL_COLOR,
  Desire: NEUTRAL_COLOR,
  Ecstasy: NEUTRAL_COLOR,
  Empathic_Pain: NEUTRAL_COLOR,
  Entrancement: NEUTRAL_COLOR,
  Nostalgia: NEUTRAL_COLOR,
  Relief: NEUTRAL_COLOR,
  Romance: NEUTRAL_COLOR,
  Surprise_negative: NEUTRAL_COLOR,
  Sympathy: NEUTRAL_COLOR,
  "Empathic Pain": BAD_COLOR,
  "Aesthetic Appreciation": GOOD_COLOR,
  Calmness: NEUTRAL_COLOR,
  Awe: GOOD_COLOR,
  "Surprise (negative)": BAD_COLOR,
  "Surprise (positive)": GOOD_COLOR,
};

export default { STATE, STATE_TIME, SOUND_TYPE, STAGE };
