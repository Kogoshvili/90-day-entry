import React, { useState } from 'react';
import { IonDatetime, IonInput, IonItem, IonLabel, IonModal } from '@ionic/react';
import './DateSelector.scss';
import { dateToString } from '../../util';

interface DateSelectorProps {
    onChange: (date: Date) => void
    label?: string
}

const DateSelector = ({ onChange, label = '' }: DateSelectorProps) => {
    const [date, setDate] = useState<Date | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    function onDateClick(e: any) {
        const date = new Date(e.target.value);
        setDate(date);
        onChange?.(date);
        setIsOpen(false);
    }

    function maxDate() {
        const date = (new Date()).getFullYear() + 20;
        return date.toString();
    }

    return (
        <IonItem className="DateSelector" onClick={() => setIsOpen(true)}>
            <IonLabel position="stacked">{label}</IonLabel>
            <IonInput
                value={dateToString(date)}
                placeholder="Select date"
            ></IonInput>
            <IonModal
                className="DateSelector-modal"
                isOpen={isOpen}
                trigger="open-modal"
            >
                <IonDatetime
                    presentation="date"
                    firstDayOfWeek={1}
                    max={maxDate()}
                    value={date?.toISOString()}
                    onBlur={e => onDateClick(e)}
                ></IonDatetime>
            </IonModal>
        </IonItem>
    );
};

export default DateSelector;
