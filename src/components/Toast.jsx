import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (message) {
            setProgress(100);
            const startTime = Date.now();
            const endTime = startTime + duration;

            const timer = setInterval(() => {
                const now = Date.now();
                const remaining = Math.max(0, endTime - now);
                const percentage = (remaining / duration) * 100;
                setProgress(percentage);

                if (remaining <= 0) {
                    clearInterval(timer);
                    onClose();
                }
            }, 10);

            return () => clearInterval(timer);
        }
    }, [message, duration, onClose]);

    const barColor = type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6';

    // Glassmorphism / Transparent Box Style
    const boxStyle = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        width: '300px',
        background: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(200, 200, 200, 0.5)',
        borderRadius: '8px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        overflow: 'hidden',
        color: '#333',
        display: 'flex',
        flexDirection: 'column',
    };

    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    style={boxStyle}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
                        <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>{message}</span>
                        <button
                            onClick={onClose}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                        >
                            <IoClose size={20} color="#666" />
                        </button>
                    </div>

                    {/* Progress Bar Container */}
                    <div style={{ width: '100%', height: '4px', background: 'rgba(0,0,0,0.05)' }}>
                        {/* Animated Progress Bar */}
                        <div
                            style={{
                                width: `${progress}%`,
                                height: '100%',
                                background: barColor,
                                transition: 'width 10ms linear'
                            }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
