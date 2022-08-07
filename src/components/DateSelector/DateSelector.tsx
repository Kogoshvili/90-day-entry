import React, { useContext, useEffect, useRef, useState } from 'react';
import { IonButton, IonButtons, IonDatetime, IonInput, IonItem, IonLabel, IonModal } from '@ionic/react';
import './DateSelector.scss';
import { dateToString } from '../../utils/util';
import { LocalizationContext } from '../../App';
import { Nullable } from '../../models/Nil';

interface DateSelectorProps {
    onChange: (date: Nullable<Date>) => void
    label?: string
    min?: string,
    value?: Nullable<Date>,
    disabled?: boolean
}

const DateSelector = ({ onChange, label, min, value = null, disabled }: DateSelectorProps) => {
    const [date, setDate] = useState<Nullable<Date>>(null);
    const datetime = useRef<Nullable<HTMLIonDatetimeElement>>(null);
    const [isOpen, setIsOpen] = useState(false);
    const localization = useContext(LocalizationContext);

    useEffect(() => {
        setDate(value);
    }, [value]);

    function onConfirmClick() {
        datetime.current?.confirm();
        const dateString = datetime.current?.value as string;
        setDate(dateString ? new Date(dateString) : null);
        onChange?.(dateString ? new Date(dateString) : null);
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
                disabled={disabled}
            ></IonInput>
            <IonModal
                className="DateSelector-modal"
                isOpen={isOpen}
                trigger="open-modal"
                onDidDismiss={() => setIsOpen(false)}
            >
                <IonDatetime
                    ref={datetime}
                    locale={localization}
                    presentation="date"
                    firstDayOfWeek={1}
                    showDefaultButtons={true}
                    min={min}
                    max={maxDate()}
                    value={date?.toISOString()}
                >
                    <IonButtons slot="buttons">
                        <IonButton color="danger" onClick={() => setIsOpen(false)}>{__('cancel')}</IonButton>
                        <IonButton color="primary" onClick={() => onConfirmClick()}>{__('confirm')}</IonButton>
                    </IonButtons>
                </IonDatetime>
            </IonModal>
        </IonItem>
    );
};

export default DateSelector;
