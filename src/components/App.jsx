import { useState } from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const localState = {
    good,
    neutral,
    bad,
  };

  const countTotalFeedback = () => {
    return Object.values(localState).reduce(
      (total, value) => (total += value),
      0
    );
  };

  const countPositiveFeedbackPercentage = totalFeedback => {
    return totalFeedback ? Math.round((good / totalFeedback) * 100) : 0;
  };

  const handleLeaveFeedback = reaction => {
    switch (reaction) {
      case 'good':
        setGood(prevValue => prevValue + 1);
        break;
      case 'neutral':
        setNeutral(prevValue => prevValue + 1);
        break;
      case 'bad':
        setBad(prevValue => prevValue + 1);
        break;
      default:
        return;
    }
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage(total);

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(localState)}
          onLeaveFeedback={handleLeaveFeedback}
        />
      </Section>
      {total > 0 && (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        </Section>
      )}
      {!total && <Notification message="There is no feedback" />}
    </>
  );
};

// export class App extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   countTotalFeedback = () => {
//     return Object.values(this.state).reduce(
//       (total, value) => (total += value),
//       0
//     );
//   };
//   countPositiveFeedbackPercentage = totalFeedback => {
//     return totalFeedback
//       ? Math.round((this.state.good / totalFeedback) * 100)
//       : 0;
//   };

//   handleLeaveFeedback = reaction => {
//     this.setState(prevState => {
//       return {
//         [reaction]: prevState[reaction] + 1,
//       };
//     });
//   };

//   render() {
//     const { good, neutral, bad } = this.state;
//     const {
//       countTotalFeedback,
//       countPositiveFeedbackPercentage,
//       handleLeaveFeedback,
//       state,
//     } = this;
//     const total = countTotalFeedback();
//     const positivePercentage = countPositiveFeedbackPercentage(total);
//     return (
//       <>
//         <Section title="Please leave feedback">
//           <FeedbackOptions
//             options={Object.keys(state)}
//             onLeaveFeedback={handleLeaveFeedback}
//           />
//         </Section>
//         {total > 0 && (
//           <Section title="Statistics">
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={total}
//               positivePercentage={positivePercentage}
//             />
//           </Section>
//         )}
//         {!total && <Notification message="There is no feedback" />}
//       </>
//     );
//   }
// }
