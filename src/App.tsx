import { useEffect, useState } from 'react';
import {
    IonActionSheet,
    IonApp,
    IonButton,
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonTitle,
    IonToolbar,
    setupIonicReact
} from '@ionic/react';
import IntervalSelector from './components/IntervalSelector/IntervalSelector';
import { intervalInDays, dateToString } from './utils/util';
import Interval from './models/Interval';
import { Nullable } from './models/Nil';
import { OverlayEventDetail } from '@ionic/core';

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
import './theme/variables.scss';
import './App.scss';

setupIonicReact();

interface Streak extends Interval {
    length: number;
}

const App: React.FC = () => {
    const [intervals, setIntervals] = useState<Interval[]>([]);
    const [numberOfStays, setNumberOfStays] = useState([...Array(1).keys()]);
    const [streaks, setStreaks] = useState<Streak[]>([]);
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [localization, setLocalization] = useState('en');

    useEffect(() => {
        const lang = localStorage.getItem('lang');
        if (lang) {
            setLocalization(lang);
        } else {
            localStorage.setItem('lang', 'en');
        }
    }, []);

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

    function onLangSelect(e: CustomEvent<OverlayEventDetail<any>>) {
        const lang = e.detail.data;
        localStorage.setItem('lang', lang);
        setLocalization(lang);
        setShowActionSheet(false);
    }

    return (
        <IonApp className={`App ${localization}`}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="App-title">{ __('enter previous stay(s) in the schengen area') }</IonTitle>
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
                        {__('days left')}: { daysLeft() }
                    </div>
                    <div className="App-result-breakdown">
                        {
                            streaks.map((streak, i) =>
                                <div key={i}>
                                    {__('streak')} #{i + 1} {dateToString(streak.start)} - {dateToString(streak.end)}: {streak.length} {__('days')}
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="App-disclaimer" dangerouslySetInnerHTML={{ __html: __('_disclaimer') }}></div>
            </IonContent>
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton onClick={() => setShowActionSheet(true)}>
                    { languages.find(l => l.data === localization)?.flag }
                </IonFabButton>
            </IonFab>
            <IonActionSheet
                isOpen={showActionSheet}
                onDidDismiss={onLangSelect}
                buttons={[
                    ...languages, {
                        text: __('cancel'),
                        role: 'cancel'
                    }]}
            >
            </IonActionSheet>
        </IonApp>
    );
};

const languages = [{
    flag: '🇺🇸',
    text: '🇺🇸 English',
    data: 'en'
}, {
    flag: '🇬🇪',
    text: '🇬🇪 ქართული',
    data: 'ka'
}];

export default App;
