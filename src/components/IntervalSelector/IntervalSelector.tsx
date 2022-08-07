import React, { useEffect, useState } from 'react';
import DateSelector from '../DateSelector/DateSelector';
import 'react-datepicker/dist/react-datepicker.css';
import './IntervalSelector.scss';
import { IonBadge, IonCol, IonGrid, IonRow } from '@ionic/react';
import { intervalInDays } from '../../utils/util';
import Interval from '../../models/Interval';
import { Nullable } from '../../models/Nil';

interface IntervalSelectorProps {
    onChange: (date: Interval) => void,
    className: string
}

function IntervalSelector({ onChange, className = '' }: IntervalSelectorProps) {
    const [startDate, setStartDate] = useState<Nullable<Date>>(null);
    const [endDate, setEndDate] = useState<Nullable<Date>>(null);
    const [days, setDays] = useState<number | null>(null);

    useEffect(() => {
        setDays(intervalInDays(endDate, startDate));
        onChange?.({
            start: startDate,
            end: endDate
        });
    }, [startDate, endDate]);

    useEffect(() => {
        if (days !== null && days < 0) {
            setEndDate(null);
        }
    }, [days]);

    return (
        <IonGrid className={`IntervalSelector ${className}`}>
            <IonRow>
                <IonCol size="5" className="IntervalSelector-start">
                    <DateSelector onChange={setStartDate} label={ __('enter date') }/>
                </IonCol>
                <IonCol size="2" className="IntervalSelector-badge-wrapper">
                    <IonBadge className="IntervalSelector-badge">{ days ?? ' - '}</IonBadge>
                </IonCol>
                <IonCol size="5" className="IntervalSelector-end">
                    <DateSelector
                        onChange={setEndDate}
                        disabled={!startDate}
                        label={ __('exit date') }
                        min={startDate?.toISOString()}
                        value={endDate}
                    />
                </IonCol>
            </IonRow>
        </IonGrid>
    );
}

export default IntervalSelector;
