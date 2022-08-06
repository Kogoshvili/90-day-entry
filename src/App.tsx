import { useState } from 'react';
import {
    IonApp,
    IonButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    setupIonicReact
} from '@ionic/react';
import IntervalSelector from './components/IntervalSelector/IntervalSelector';
import { intervalInDays, dateToString } from './util';
import Interval from './models/Interval';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

/* Theme variables */
import './theme/variables.css';
import './App.scss';
import { Nullable } from './models/Nil';

setupIonicReact();

interface Streak extends Interval {
    length: number;
}

const App: React.FC = () => {
    const [intervals, setIntervals] = useState<Interval[]>([]);
    const [numberOfStays, setNumberOfStays] = useState([...Array(1).keys()]);
    const [streaks, setStreaks] = useState<Streak[]>([]);

    function onIntervalSelect(index: number, interval: Interval) {
        const newIntervals = intervals;
        newIntervals[index] = interval;
        setIntervals(newIntervals);
        calculate();
    }

    function calculate() {
        const days: Streak[] = [
            {
                start: intervals[0].start,
                end: intervals[0].end,
                length: 0
            }
        ];

        for (const interval of intervals) {
            const streakLength = intervalInDays(interval.end, days.at(-1)?.start);

            if (streakLength >= 180) {
                days.push({
                    start: interval.start,
                    end: interval.start,
                    length: 0
                });
            }

            days[days.length - 1] = {
                start: days.at(-1)?.start,
                end: interval.end,
                length: Number(days.at(-1)?.length) + intervalInDays(interval.end, interval.start)
            };
        }

        setStreaks(days);
    }

    function daysLeft(): Nullable<number> {
        const days = 90 - Number(streaks.at(-1)?.length);
        return Number.isNaN(days) ? null : days;
    }

    function daysInfoClass(): string {
        const days = daysLeft();
        if (!days) return '';

        if (days >= 30) {
            return 'safe';
        } else if (days >= 14) {
            return 'warning';
        }

        return 'danger';
    }

    return (
        <IonApp>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle className="App-title">Enter previous stay(s) in the Schengen area</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <div className="App-intervals">
                        {
                            numberOfStays.map(i =>
                                <IntervalSelector
                                    key={i}
                                    className="App-intervals-interval"
                                    onChange={interval => onIntervalSelect(i, interval)}
                                />
                            )
                        }
                        <div className="App-intervals-buttons">
                            <IonButton
                                size="small"
                                color="secondary"
                                onClick={() => setNumberOfStays([...Array(numberOfStays.length + 1).keys()])}
                            >+</IonButton>
                            <IonButton
                                size="small"
                                color="danger"
                                onClick={() => setNumberOfStays([...Array(numberOfStays.length - 1).keys()])}
                                disabled={numberOfStays.length === 1}
                            >-</IonButton>
                        </div>
                    </div>
                    <div className="App-result">
                        <div className={`App-result-days ${daysInfoClass()}`}>
                            Days left: { daysLeft() }
                        </div>
                        <div className="App-result-breakdown">
                            {
                                streaks.map((streak, i) =>
                                    <div key={i}>
                                        Streak #{i + 1} {dateToString(streak.start)} - {dateToString(streak.end)}: {streak.length} Days
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="App-disclaimer">
                        *The calculator is a helping tool only;<br/>
                        it does not constitute a right to stay for<br/>
                        a period resulting from its calculation.
                    </div>
                </IonContent>
            </IonPage>
        </IonApp>
    );
};

export default App;
