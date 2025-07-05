"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

interface DatePickerProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}

const DatePicker = ({ onDateSelect, selectedDate }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMonthSelectOpen, setIsMonthSelectOpen] = useState(false);
  const [isYearSelectOpen, setIsYearSelectOpen] = useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Generate array of years (from 1900 to current year + 5)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 6 }, (_, i) => currentYear + 5 - i);

  const generateCalendarDays = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    // Add the days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const currentDate = new Date(selectedDate);
  const currentMonth = currentDate.getMonth();
  const calendarDays = generateCalendarDays(currentDate.getFullYear(), currentMonth);

  const handlePrevMonth = () => {
    onDateSelect(new Date(currentDate.getFullYear(), currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    onDateSelect(new Date(currentDate.getFullYear(), currentMonth + 1, 1));
  };

  const handleMonthSelect = (monthIndex: number) => {
    onDateSelect(new Date(currentDate.getFullYear(), monthIndex, 1));
    setIsMonthSelectOpen(false);
  };

  const handleYearSelect = (year: number) => {
    onDateSelect(new Date(year, currentMonth, 1));
    setIsYearSelectOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-3 text-left bg-[#0a0a1a]/40 backdrop-blur-sm rounded-xl border border-purple-500/30 text-white hover:border-purple-500/50 transition-all"
      >
        <div className="flex items-center justify-between">
          <span>{format(selectedDate, 'MMMM d, yyyy')}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ▼
          </motion.span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-2 w-full bg-[#0a0a1a]/95 backdrop-blur-md rounded-xl border border-purple-500/30 p-4 shadow-lg shadow-purple-500/10"
          >
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handlePrevMonth}
                className="p-2 text-white hover:bg-purple-500/20 rounded-lg transition-colors"
              >
                ←
              </button>
              <div className="flex gap-2 items-center">
                {/* Month Selection */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsMonthSelectOpen(!isMonthSelectOpen);
                      setIsYearSelectOpen(false);
                    }}
                    className="text-lg font-semibold text-white hover:text-purple-300 transition-colors px-2 py-1 rounded"
                  >
                    {months[currentMonth]}
                  </button>
                  <AnimatePresence>
                    {isMonthSelectOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-1 left-0 bg-[#0a0a1a] border border-purple-500/30 rounded-lg py-2 w-40 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent"
                      >
                        {months.map((month, index) => (
                          <button
                            key={month}
                            onClick={() => handleMonthSelect(index)}
                            className={`w-full text-left px-4 py-2 hover:bg-purple-500/20 transition-colors ${
                              index === currentMonth ? 'text-purple-400' : 'text-white'
                            }`}
                          >
                            {month}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Year Selection */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsYearSelectOpen(!isYearSelectOpen);
                      setIsMonthSelectOpen(false);
                    }}
                    className="text-lg font-semibold text-white hover:text-purple-300 transition-colors px-2 py-1 rounded"
                  >
                    {currentDate.getFullYear()}
                  </button>
                  <AnimatePresence>
                    {isYearSelectOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-1 left-0 bg-[#0a0a1a] border border-purple-500/30 rounded-lg py-2 w-24 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent"
                      >
                        {years.map((year) => (
                          <button
                            key={year}
                            onClick={() => handleYearSelect(year)}
                            className={`w-full text-left px-4 py-2 hover:bg-purple-500/20 transition-colors ${
                              year === currentDate.getFullYear() ? 'text-purple-400' : 'text-white'
                            }`}
                          >
                            {year}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <button
                onClick={handleNextMonth}
                className="p-2 text-white hover:bg-purple-500/20 rounded-lg transition-colors"
              >
                →
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2 text-center text-sm">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-purple-300">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((date, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (date) {
                      onDateSelect(date);
                      setIsOpen(false);
                    }
                  }}
                  className={`
                    p-2 rounded-lg text-center text-sm
                    ${!date ? 'invisible' : 'hover:bg-purple-500/20'}
                    ${date && date.getDate() === selectedDate.getDate() && 
                      date.getMonth() === selectedDate.getMonth() ? 
                      'bg-purple-500 text-white' : 'text-white'}
                  `}
                >
                  {date?.getDate()}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DatePicker; 