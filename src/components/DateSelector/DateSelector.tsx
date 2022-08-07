import React, { useContext, useState } from 'react';
import { IonDatetime, IonInput, IonItem, IonLabel, IonModal } from '@ionic/react';
import './DateSelector.scss';
import { dateToString } from '../../utils/util';
import { LocalizationContext } from '../../App';

interface DateSelectorProps {
    onChange: (date: Date) => void
    label?: string
}

const DateSelector = ({ onChange, label = '' }: DateSelectorProps) => {
    const [date, setDate] = useState<Date | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const localization = useContext(LocalizationContext);

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
        <IonItem className={`DateSelector ${localization}`}>
            <IonLabel position="stacked">{label}</IonLabel>
            <IonInput
                value={dateToString(date)}
                placeholder={__('select date')}
                onClick={() => setIsOpen(true)}
                onFocus={() => setIsOpen(true)}
            ></IonInput>
            <IonModal
                className="DateSelector-modal"
                isOpen={isOpen}
                trigger="open-modal"
            >
                <IonDatetime
                    locale={localization}
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
