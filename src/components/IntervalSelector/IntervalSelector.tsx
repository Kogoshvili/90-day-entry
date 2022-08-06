import React, { useEffect, useState } from 'react';
import DateSelector from '../DateSelector/DateSelector';
import 'react-datepicker/dist/react-datepicker.css';
import './IntervalSelector.scss';
import { IonBadge, IonCol, IonGrid, IonRow } from '@ionic/react';
import { intervalInDays } from '../../utils/util';
import Interval from '../../models/Interval';

interface IntervalSelectorProps {
    onChange: (date: Interval) => void,
    className: string
}

function IntervalSelector({ onChange, className = '' }: IntervalSelectorProps) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [days, setDays] = useState<number | null>(null);

    useEffect(() => {
        if (startDate && endDate) {
            setDays(intervalInDays(endDate, startDate));
            onChange?.({
                start: startDate,
                end: endDate
            });
        }
    }, [startDate, endDate]);


    return (
        <IonGrid className={`IntervalSelector ${className}`}>
            <IonRow>
                <IonCol className="IntervalSelector-start">
                    <DateSelector onChange={setStartDate} label={ __('enter date') }/>
                </IonCol>
                <IonCol size='2' className="IntervalSelector-badge-wrapper">
                    <IonBadge className="IntervalSelector-badge">{ days ?? '-'}</IonBadge>
                </IonCol>
                <IonCol className="IntervalSelector-end">
                    <DateSelector onChange={setEndDate} label={ __('exit date') }/>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
}

export default IntervalSelector;
