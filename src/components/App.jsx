import { GlobalStyle } from './GlobalStyle';
import { useState } from "react";
import { FeedbackOptions } from './FeedbackOptions';
import { Layout } from './Layout';
import { Statistics } from './Statistics';
import { Section } from './Section';
import { Notification } from './Notification';

export const App = () => {

  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });


let options = Object.keys(feedback);
 
 const addVoice = option => {
   setFeedback(prevFeedback => ({
     ...prevFeedback,
      [option]: prevFeedback[option] + 1,
    }));
  };

  const countTotalFeedback = values => {
    let total = 0;
    values.map(value => (total = total + value));
    return total;
  };
const countPositiveFeedbackPercentage = values => {
    return Math.round((values[0] / countTotalFeedback(values)) * 100);
  };


  let values = Object.values(feedback);
  let countfeedback = countTotalFeedback(values);

    countfeedback === 0 ? (countfeedback = '') : (countfeedback = true);
   
  return (
    <Layout>
        <Section title="Please leave feedback">
        <FeedbackOptions options={options} addVoice={addVoice} />
        </Section>
        {!countfeedback && <Notification />}
        <Section title="Statistics">
          {countfeedback && (
            <Statistics
              values={values}
              total={countTotalFeedback}
              percentage={countPositiveFeedbackPercentage}
            />
          )}
        </Section>
        <GlobalStyle />
      </Layout>
    );
  }
