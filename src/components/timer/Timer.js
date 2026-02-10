import { useCallback, useEffect, useState } from 'react';
import './timer.css';

const Timer = ({ targetDate }) => {

    // функция расчёта времени
    const calculateTimeLeft = useCallback(() => {
        
        const target = new Date(targetDate);
        // Проверка на невалидную дату
        if(isNaN(target.getTime())){
            console.error('Invalid target date');
            return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
        }

        const difference = target - new Date();
        // Если событие уже прошло
        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            isExpired: false
        }
    }, [targetDate])

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)

    // Эффект для обновления таймера каждую секунду
    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);

            if (newTimeLeft.isExpired) {
                clearInterval(timer)
            }
        }, 1000)

        return () => clearInterval(timer);
    }, [calculateTimeLeft])

    // Форматирование чисел
    const formatNumber = (num) => String(num).padStart(2, '0');

    // Условный рендеринг
    if (timeLeft.isExpired) {
        return (
            <div className="countdown-timer expired">
                <h2>The event has started!</h2>
            </div>
        )
    }

    return (
        <div className="countdown-timer">
            <h2 className="countdown-title">Time until event</h2>
            
            <div className="countdown-display">
                <div className="time-block">
                    <div className="time-value">{formatNumber(timeLeft.days)}</div>
                    <div className="time-label">days</div>
                </div>

                <div className="time-separator">:</div>

                <div className="time-block">
                    <div className="time-value">{formatNumber(timeLeft.hours)}</div>
                    <div className="time-label">hours</div>
                </div>

                <div className="time-separator">:</div>

                <div className="time-block">
                    <div className="time-value">{formatNumber(timeLeft.minutes)}</div>
                    <div className="time-label">minutes</div>
                </div>

                <div className="time-separator">:</div>

                <div className="time-block">
                    <div className="time-value">{formatNumber(timeLeft.seconds)}</div>
                    <div className="time-label">seconds</div>
                </div>
            </div>
        </div>
    )
}

export default Timer;